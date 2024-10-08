import { useAuth } from "@contexts/auth/AuthContext";

export default function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <h1 onClick={logout} onKeyDown={() => {}}>
        Home
      </h1>
    </div>
  );
}
