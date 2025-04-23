"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    // Clear router cache (protected routes)
    router.refresh();
  }, [router]);

  return (
    <main className="bg-muted flex min-h-screen grow flex-col items-center justify-center p-4">
      <AuthCard
        classNames={{
          form: { actionButton: "bg-indigo-700" },
        }}
        redirectTo={`/welcome?${searchParams.toString()}`}
        pathname={pathname}
      />
    </main>
  );
}
