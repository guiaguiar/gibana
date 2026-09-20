import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfb] px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#99623B]">
            Painel Gibana
          </h1>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white shadow-lg rounded-[20px] p-6 opacity-60">
            <h2 className="text-lg font-medium text-[#4B575E]">
              Produtos avulsos
            </h2>
            <p className="text-sm text-[#9EA9B0] mt-1">
              Em breve: cadastrar prints, pinturas e adesivos.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-[20px] p-6 opacity-60">
            <h2 className="text-lg font-medium text-[#4B575E]">Portfólio</h2>
            <p className="text-sm text-[#9EA9B0] mt-1">
              Em breve: gerenciar a galeria de obras (óleo, guache).
            </p>
          </div>
        </div>

        <p className="text-sm text-[#9EA9B0]">
          Login funcionando ✅ — as telas de cadastro entram na próxima etapa.
        </p>

        <Link href="/" className="text-sm text-[#007874] underline">
          Voltar para o site
        </Link>
      </div>
    </div>
  );
}
