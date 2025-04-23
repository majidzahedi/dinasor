"use client";
import { Button } from "@/components/ui/button";
import type { TodoGetManyOutput } from "@/modules/todo/types";
import { useTRPC } from "@/trpc/react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useSubscription } from "@trpc/tanstack-react-query";

export const dynamic = "force-dynamic";

export default function Page() {
  const api = useTRPC();

  const queryClient = useQueryClient();

  const { data } = useQuery(api.todo.getMany.queryOptions());
  const create = useMutation(api.todo.create.mutationOptions());

  useSubscription(
    api.todo.onTodoCreate.subscriptionOptions(undefined, {
      onData: (newTodo) => {
        queryClient.setQueriesData(
          api.todo.getMany.queryFilter(),
          (data: TodoGetManyOutput) => {
            return [...data, newTodo];
          },
        );
      },
    }),
  );

  return (
    <div className="flex min-h-screen w-full">
      <pre className="max-h-10 text-sm">{JSON.stringify(data, null, 2)}</pre>
      <Button className="fixed top-4 left-4" onClick={() => create.mutate()}>
        Create
      </Button>
    </div>
  );
}
