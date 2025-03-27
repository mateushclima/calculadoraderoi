import { useState } from "react";

export default function Home() {
  const [nomeCliente, setNomeCliente] = useState("");
  const [impactados, setImpactados] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [ticket, setTicket] = useState(0);
  const [frequencia, setFrequencia] = useState(1);
  const [mensalidade, setMensalidade] = useState(0);

  const convertidos = impactados * (taxa / 100);
  const receita = convertidos * ticket * frequencia;
  const lucro = receita - mensalidade;
  const roi = mensalidade > 0 ? (lucro / mensalidade) * 100 : 0;
  const roiReduc = roi / 2;

  const getClassificacao = (valor) => {
    if (valor < 100) return "Ruim";
    if (valor < 300) return "Regular";
    if (valor < 600) return "Bom";
    if (valor < 1000) return "Muito Bom";
    return "Excelente / Fora da curva";
  };

  const getCor = (valor) => {
    if (valor < 100) return "#ef4444";
    if (valor < 300) return "#facc15";
    if (valor < 600) return "#fbbf24";
    if (valor < 1000) return "#4ade80";
    return "#22c55e";
  };

  const exportarPDF = () => {
    window.print();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <img src="/repediu-logo.png" alt="Repediu" className="h-12" />
      <h1 className="text-2xl font-bold text-[#FF2D55]">Calculadora de ROI - Repediu</h1>

      <div className="grid grid-cols-2 gap-4 p-4 border rounded-md bg-white shadow">
        <div className="col-span-2">
          <label className="font-semibold">Nome do cliente</label>
          <input value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-semibold">Mensagens enviadas</label>
          <input type="number" value={impactados} onChange={(e) => setImpactados(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-semibold">Taxa de conversão (%)</label>
          <input type="number" step="0.01" value={taxa} onChange={(e) => setTaxa(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-semibold">Ticket médio (R$)</label>
          <input type="number" step="0.01" value={ticket} onChange={(e) => setTicket(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-semibold">Frequência/mês</label>
          <input type="number" step="1" value={frequencia} onChange={(e) => setFrequencia(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="font-semibold">Mensalidade Repediu (R$)</label>
          <input type="number" step="0.01" value={mensalidade} onChange={(e) => setMensalidade(+e.target.value)} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="p-4 border rounded-md shadow space-y-2 bg-white">
        <p><strong>Cliente:</strong> {nomeCliente}</p>
        <p><strong>Clientes que retornaram:</strong> {convertidos.toFixed(2)}</p>
        <p><strong>Receita gerada:</strong> R$ {receita.toFixed(2)}</p>
        <p><strong>Lucro líquido:</strong> R$ {lucro.toFixed(2)}</p>
        <p><strong>ROI:</strong> {roi.toFixed(2)}%</p>
        <p><strong>ROI reduzido (50%):</strong> {roiReduc.toFixed(2)}%</p>
        <div>
          <p className="font-semibold">Classificação do ROI:</p>
          <div className="w-full h-4 rounded" style={{ backgroundColor: getCor(roi) }} />
          <p>{getClassificacao(roi)}</p>
        </div>
        <button onClick={exportarPDF} className="px-4 py-2 bg-[#FF2D55] text-white rounded">Exportar PDF</button>
      </div>
    </main>
  );
}
