import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [user, setUser] = useState("");

  const handleLogin = () => {
    if (user) {
      login();
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <input
        placeholder="Usuário"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}