import { HydrateClient } from "@/trpc/server";
import {
  SettingsCards,
  UserAvatar,
  UserButton,
} from "@daveyplate/better-auth-ui";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-2">
        <UserButton
          size="full"
          classNames={{
            trigger: {
              base: "flex-row-reverse",
            },
            content: {
              base: "flex-row-reverse",
              menuItem: "flex-row-reverse",
            },
          }}
        />
        <SettingsCards
          classNames={{
            card: {
              header: "rtl:text-right",
              description: "rtl:text-right",
              input: "rtl:text-right",
              label: "ml-auto",
              footer: "rtl:md:flex-row-reverse",
              button: "rtl:ms-0 rlt:mr-auto",
              cell: "rtl:flex-row-reverse ",
            },
          }}
        />
      </div>
    </HydrateClient>
  );
}
