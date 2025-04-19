import Link from "next/link";

import { HydrateClient } from "@/trpc/server";
import { UserButton } from "@daveyplate/better-auth-ui";

export default async function Home() {
  return (
    <HydrateClient>
      <UserButton size="full" localization={{}} />
    </HydrateClient>
  );
}
