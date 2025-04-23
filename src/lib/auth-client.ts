import { createAuthClient } from "better-auth/react";
import {
  phoneNumberClient,
  organizationClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [phoneNumberClient(), organizationClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
