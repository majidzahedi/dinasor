import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { property } from "@/server/db/schema";
import { eq, lt } from "drizzle-orm";

/**
 * Property router: exposes procedures for properties.
 */
export const propertyRouter = createTRPCRouter({
  /**
   * Fetch many properties with infinite scrolling (cursor-based pagination).
   * Input: { limit?: number, cursor?: number }
   * Output: { items: Property[], nextCursor?: number }
   */
  getMany: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional(),
        cursor: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const cursorDate = input.cursor ? new Date(input.cursor) : undefined;

      let builder = ctx.db
        .select()
        .from(property)
        .where(eq(property.organizationId, ctx.session.activeOrganizationId));
      if (cursorDate) {
        builder = builder.where(lt(property.createdAt, cursorDate));
      }
      const rows = await builder
        .orderBy(property.createdAt, "desc")
        .limit(limit + 1);

      const items = rows.slice(0, limit);
      const nextCursor =
        rows.length > limit ? rows[limit].createdAt.getTime() : undefined;
      return { items, nextCursor };
    }),
});

