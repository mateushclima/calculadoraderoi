
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

  const exportarPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("resultado-pdf");
    const opt = {
      margin: 0.3,
      filename: `ROI_${nomeCliente || "cliente"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 font-sans">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <img src="/repediu-logo.png" alt="Repediu" className="h-10" />
          <nav className="flex gap-6 text-repediu font-medium">
            <a href="/" className="hover:underline underline-offset-4 transition">Calculadora</a>
            <a href="/roi" className="hover:underline underline-offset-4 transition">Saiba mais sobre ROI</a>
          </nav>
        </div>
      </header>

      <h1 className="text-2xl font-bold text-repediu">Calculadora de ROI</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-2xl shadow-md bg-white">
        <div className="sm:col-span-2">
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

      <div id="resultado-pdf" className="p-4 border rounded-2xl shadow-md bg-white space-y-3">
        <h2 className="text-lg font-semibold text-repediu border-b pb-1">📊 Resultados automáticos</h2>
        <p><strong>Cliente:</strong> {nomeCliente}</p>
        <p><strong>Clientes que retornaram:</strong> {convertidos.toFixed(2)}</p>
        <p><strong>Receita gerada:</strong> {receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p><strong>Lucro líquido:</strong> {lucro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        <p className="text-3xl font-bold" style={{ color: getCor(roi) }}>ROI: {roi.toFixed(2)}%</p>
        <p><span className="font-semibold" style={{ color: getCor(roiReduc) }}>ROI reduzido:</span> <span style={{ color: getCor(roiReduc) }}>{roiReduc.toFixed(2)}%</span></p>
        <div>
          <p className="font-semibold mb-1">Classificação do ROI:</p>
          <div className="h-4 rounded transition-all duration-300" style={{ backgroundColor: getCor(roi), width: Math.min(Math.max(roi, 5), 100) + "%" }} />
          <span className="inline-block mt-1 px-3 py-1 rounded-full text-white text-sm font-medium" style={{ backgroundColor: getCor(roi) }}>
            {getClassificacao(roi)}
          </span>
        </div>
      </div>

      <div className="text-right">
        <button onClick={exportarPDF} className="px-4 py-2 bg-repediu text-white rounded shadow-md">Exportar PDF</button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">Criado com ❤️ por Repediu</p>
    </main>
  );
}
