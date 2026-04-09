import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useState } from "react";
import {QRCodeSVG} from "qrcode.react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";

interface Item {
  id: string;
  name: string;
  unit: string;
  disabled: boolean;
  gender: number;
  gridId: number;
  quantity: number;
  volume: number;
  enviarEcommerce: boolean;
  ncm: string;
  icp: string;
  createdAt?: string;
  updatedAt?: string;
  lastBalanceAt?: string;
  prices: Record<string, number>;
}


export default function Dashboard() {
  const [selected, setSelected] = useState<Item[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["codes"],
    queryFn: async () => {
      const res = await api.get<Item[]>("/codes");
      return res.data;
    },
  });

  const toggleSelect = (item: Item) => {
    setSelected((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === data?.length) {
      setSelected([]);
    } else {
      setSelected(data || []);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>QR Code Manager</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h4>Lista de Códigos</h4>

        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Erro ao carregar dados</Alert>}

        <Form.Check
          type="checkbox"
          label="Selecionar todos"
          className="mb-3"
          onChange={handleSelectAll}
        />

        <Row>
          {data?.map((item) => (
            <Col key={item.id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Form.Check
                    type="checkbox"
                    label={item.code}
                    onChange={() => toggleSelect(item)}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Button className="mt-3" onClick={() => window.print()}>
          Imprimir Selecionados
        </Button>

        <Row className="mt-4">
          {selected.map((item) => (
            <Col key={item.id} md={3} className="mb-3 text-center">
              <Card>
                <Card.Body>
                  <QRCodeSVG value={item.id} />
                  <div>{item.code}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}