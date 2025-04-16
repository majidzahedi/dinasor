import { signIn } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";

export const LoginForm = () => {
  const signInGoogle = useMutation({
    mutationKey: ["signin-google"],
    mutationFn: () => signIn.social({ provider: "google" }),
    onSuccess: (data) => {},
  });

  return (
    <div>
      <form>
        <button onClick={() => signInGoogle.mutate()}>login with google</button>
      </form>
    </div>
  );
};
