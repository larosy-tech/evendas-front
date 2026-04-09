import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { Container, Form, Button, Card, Image } from "react-bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [user, setUser] = useState("");

  const handleLogin = () => {
    if (user) {
      login();
      navigate("/gestao-tags");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#54217b" }}>
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <Card.Body>
          <Image
            src="/logo.webp"
            alt="Logo do Sistema"
            fluid
            style={{ maxHeight: 100, marginBottom: 20 }}
          />
          <h3 className="mb-3">Login</h3>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" className="w-100" onClick={handleLogin}>
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
