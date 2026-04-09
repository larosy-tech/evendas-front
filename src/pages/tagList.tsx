import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import {QRCodeSVG} from "qrcode.react";

export default function TagsList() {
  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await api.get("/api/tags");
      return res.data;
    },
  });

  const handlePrint = () => {
    window.print();
  };
 return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Tags Criadas</h4>
        <Button onClick={handlePrint}>Imprimir</Button>
      </div>

      {data?.map((group: any) => (
        <Card key={group.productId} className="mb-4">
          <Card.Body>
            <h5>Produto: {group.productId}</h5>

            <Row>
              {group.tags.map((tag: any) => (
                <Col key={tag.id} md={3} className="mb-3 text-center">
                  <Card>
                    <Card.Body>
                      <QRCodeSVG value={tag.code || tag.id} />
                      <div>{tag.code || tag.id}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}