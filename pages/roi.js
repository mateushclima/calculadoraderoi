
import Link from "next/link";

export default function ROIInfo() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans space-y-6">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <img src="/repediu-logo.png" alt="Repediu" className="h-10" />
          <nav className="flex gap-6 text-repediu font-medium">
            <Link href="/" className="hover:underline underline-offset-4 transition">Calculadora</Link>
            <Link href="/roi" className="hover:underline underline-offset-4 transition">Saiba mais sobre ROI</Link>
          </nav>
        </div>
      </header>

      <h1 className="text-3xl font-bold text-repediu">O que é ROI?</h1>
      <p className="text-gray-700 leading-relaxed">
        ROI (Retorno sobre Investimento) é uma métrica que mostra quanto você ganhou (ou perdeu) em relação ao que investiu.
      </p>

      <h2 className="text-xl font-semibold mt-6">📈 Como é calculado?</h2>
      <p className="text-gray-700">
        <strong className="text-black">Fórmula:</strong><br />
        <code className="bg-gray-100 p-1 rounded block mt-1">
          ROI (%) = ((Lucro líquido / Investimento) * 100)
        </code>
        <span className="block mt-2">Lucro líquido = Receita gerada - Investimento (ex: valor pago à Repediu)</span>
      </p>

      <h2 className="text-xl font-semibold mt-6">🧠 Exemplo prático</h2>
      <p className="text-gray-700">
        Se você investiu <strong>R$ 300</strong> em campanhas via Repediu e isso gerou <strong>R$ 3.000</strong> em retorno:
        <br />
        ROI = ((3000 - 300) / 300) * 100 = <strong>900%</strong>
      </p>

      <h2 className="text-xl font-semibold mt-6">🎯 Interprete o resultado</h2>
      <ul className="list-disc pl-6 text-gray-700">
        <li><strong>Até 99%</strong> – Ruim (prejuízo ou empate)</li>
        <li><strong>100% a 299%</strong> – Regular</li>
        <li><strong>300% a 599%</strong> – Bom</li>
        <li><strong>600% a 999%</strong> – Muito Bom</li>
        <li><strong>1000%+</strong> – Excelente / Fora da curva</li>
      </ul>

      <footer className="text-center text-xs text-gray-400 mt-12">
        Criado com ❤️ por Repediu
      </footer>
    </main>
  );
}
