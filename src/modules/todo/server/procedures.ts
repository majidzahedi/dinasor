import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { todo, todoUpdateSchema } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const todoRoute = createTRPCRouter({
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db
      .select()
      .from(todo)
      .where(and(eq(todo.creatorId, ctx.session.userId)));

    return todos;
  }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const session = ctx.session;

    const [newTodo] = await ctx.db
      .insert(todo)
      .values({
        organizationId: session.activeOrganizationId,
        creatorId: session.userId,
        title: "new todo",
      })
      .returning();

    if (!newTodo) throw new TRPCError({ code: "BAD_REQUEST" });

    await ctx.publishEvent("todo:create", [
      session.activeOrganizationId!,
      newTodo,
      session.userId,
    ]);

    return newTodo;
  }),
  edit: protectedProcedure
    .input(todoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, assignedTo, status, dueDate, id } = input;

      if (!id) throw new TRPCError({ code: "BAD_REQUEST" });

      const [updatedTodo] = await ctx.db
        .update(todo)
        .set({
          title,
          assignedTo,
          status,
          dueDate,
        })
        .where(eq(todo.id, id))
        .returning();

      return updatedTodo;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const [deletedTodo] = await ctx.db
        .delete(todo)
        .where(eq(todo.id, id))
        .returning();

      return deletedTodo;
    }),
  onTodoCreate: protectedProcedure.subscription(async function* (opts) {
    const { userId, activeOrganizationId } = opts.ctx.session;
    const stream = opts.ctx.subscribeToEvent("todo:create");
    opts.signal?.addEventListener("abort", () => {
      stream.return?.("");
    });

    for await (const [organizationId, todo, senderId] of stream) {
      if (organizationId === activeOrganizationId) {
        const newTodo = todo;
        yield newTodo;
      }
    }
  }),
});
