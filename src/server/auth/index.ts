import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, phoneNumber, organization } from "better-auth/plugins";

import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    admin(),
    phoneNumber(),
    organization({
      allowUserToCreateOrganization: false,
    }),
  ],
});
