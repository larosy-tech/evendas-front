import { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { Product, Color, Size } from "../types/product";

export default function GestaoTags() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProduct = async () => {
    if (!productId) return;

    try {
      const res = await api.get(`/AlphaProduto/${productId}`);
      setProduct(res.data);
      setError("");
    } catch {
      setError("Produto não encontrado");
      setProduct(null);
    }
  };

  const handleCreateTag = async () => {
    try {
      await api.post("/api/tags", {
        productId: product?.id,
        quantity,
        colorId: selectedColor?.id,
        sizeId: selectedSize?.id,
      });

      setSuccess("Tags criadas com sucesso!");

      setTimeout(() => {
        navigate("/tags");
      }, 1200);
    } catch {
      setError("Erro ao criar tags");
    }
  };
return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h4>Gestão de Tags</h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Referência do Produto</Form.Label>
              <Form.Control
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                onBlur={fetchProduct}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fetchProduct();
                  }
                }}
              />
            </Form.Group>
                {product && (
              <>
                <p><strong>{product.name}</strong></p>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Cor</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          const color = product.colors.find(c => c.id === Number(e.target.value));
                          setSelectedColor(color || null);
                          setSelectedSize(null);
                        }}
                      >
                        <option value="">Selecione</option>
                        {product.colors.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Tamanho</Form.Label>
                      <Form.Select
                        onChange={(e) => {
                          const size = selectedColor?.sizes.find(s => s.id === Number(e.target.value));
                          setSelectedSize(size || null);
                        }}
                        disabled={!selectedColor}
                      >
                        <option value="">Selecione</option>
                        {selectedColor?.sizes.map((s, index) => (
                          <option key={index} value={s.id}>{s.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                 <Form.Group className="mb-3">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </Form.Group>

                <Button onClick={handleCreateTag} disabled={!selectedColor || !selectedSize}>
                  Criar Tag
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}