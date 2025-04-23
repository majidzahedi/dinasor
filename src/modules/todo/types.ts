import type { AppRouter } from "@/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";

export type TodoGetManyOutput =
  inferRouterOutputs<AppRouter>["todo"]["getMany"];

export type TodoCreateOutput = inferRouterOutputs<AppRouter>["todo"]["create"];
