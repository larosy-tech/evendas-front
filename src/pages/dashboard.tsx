import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; "qrcode.react";

interface Item {
  nome: string;
  tamanho: string;
  codigo: string
}


export default function Dashboard() {
  const [selected, setSelected] = useState<Item[]>([]);
    // const lista = [ 
    //             {nome: 'Blusa Gola Polo', tamanho: 'PP', codigo: '1234567'}, 
    //             {nome: 'Blusa Regata', tamanho: 'GG', codigo: '654321'}, 
    //             {nome: 'Sutiã ', tamanho: 'G', codigo: '111111'}, 
    //                 ]
  const { data } = useQuery({
    queryKey: ["codes"],
    queryFn: async () => {
      const res = await api.get<Item[]>("/AlphaProduto");
      return res.data;
    },
  });

  const toggleSelect = (item: Item) => {
    setSelected((prev) =>
      prev.find((i) => i.codigo === item.codigo)
        ? prev.filter((i) => i.codigo !== item.codigo)
        : [...prev, item]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Lista de Códigos</h1>

      <ul>
        {lista?.map((item) => (
          <li key={item.codigo}>
            <label>
              <input
                type="checkbox"
                onChange={() => toggleSelect(item)}
              />
              {item.nome} - tamanho {item.tamanho}
            </label>
          </li>
        ))}
      </ul>

      <button onClick={handlePrint}>Imprimir Selecionados</button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {selected.map((item) => (
          <div key={item.codigo}>
            <QRCodeSVG value={item.codigo} />
            <p>{item.codigo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
