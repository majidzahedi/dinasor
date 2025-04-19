"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter();

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
        redirectTo="/dashboard"
        pathname={pathname}
      />
    </main>
  );
}
