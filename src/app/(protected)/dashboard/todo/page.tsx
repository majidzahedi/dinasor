"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data } = api.todo.getMany.useQuery();
  const create = api.todo.create.useMutation();

  return (
    <div className="flex min-h-screen w-full">
      <pre className="max-h-10 text-sm">{JSON.stringify(data, null, 2)}</pre>
      <Button className="fixed top-4 left-4" onClick={() => create.mutate()}>
        Create
      </Button>
    </div>
  );
}
