import { useAuth } from "@pages/Auth/AuthProvider";

export function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <h1 onClick={logout}>Home</h1>
    </div>
  );
}
