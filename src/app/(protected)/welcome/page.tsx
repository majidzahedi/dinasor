import { WelcomeScreen } from "@/modules/agency/ui/sections/welcome-screen";
import { api, HydrateClient } from "@/trpc/server";

export default async function Page() {
  void api.agency.isFirstLogin.prefetch();

  return (
    <HydrateClient>
      <WelcomeScreen />;
    </HydrateClient>
  );
}
