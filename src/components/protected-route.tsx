import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";

export default async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RedirectToSignIn />

      <SignedIn>{children}</SignedIn>
    </>
  );
}
