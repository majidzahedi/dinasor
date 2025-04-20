import ProtectedRoute from "@/components/protected-route";

function Page() {
  return "helo";
}

export default () => ProtectedRoute({ children: Page() });
