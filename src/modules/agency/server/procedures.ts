import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  member,
  organization,
  organizationInsertSchema,
  session,
} from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const agencyRouter = createTRPCRouter({
  isFirstLogin: protectedProcedure.query(async ({ ctx }) => {
    const [memberWithOrg] = await ctx.db
      .select({
        orgId: organization.id,
      })
      .from(member)
      .innerJoin(organization, eq(member.organizationId, organization.id))
      .where(
        and(eq(member.userId, ctx.session.userId), eq(member.role, "owner")),
      );

    return !!memberWithOrg;
  }),
  create: protectedProcedure
    .input(organizationInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;

      const [newOrganization] = await ctx.db
        .insert(organization)
        .values(input)
        .returning();

      if (!newOrganization)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [newMember] = await ctx.db
        .insert(member)
        .values({
          userId,
          organizationId: newOrganization.id,
          role: "owner",
        })
        .returning();

      await ctx.db
        .update(session)
        .set({
          activeOrganizationId: newOrganization.id,
        })
        .where(eq(session.id, ctx.session.sessionId));

      return newMember;
    }),
});
