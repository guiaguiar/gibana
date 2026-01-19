"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import { handleManageSubscription } from "@/app/actions/stripe";

export default function MinhaContaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await handleManageSubscription(email);

      if (result.error) {
        setError(result.error);
        // If no customer found, don't redirect automatically - let user see the message
      } else if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error managing subscription:", error);
      setError("Erro ao abrir o portal de cobrança. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-8 min-h-screen">
      <div className="flex items-center justify-center pb-10 pt-4">
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Gerenciar Assinatura</h1>
        <p className="text-gray-600 mb-8 text-center">
          Digite seu email para acessar o portal de cobrança da Stripe e gerenciar sua assinatura, método de pagamento e histórico de faturas.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown focus:border-transparent"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
              {error.includes("Nenhum cliente encontrado") && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="text-red-700 underline hover:text-red-800"
                  >
                    Ver produtos e assinar
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brown text-white px-6 py-3 rounded-md hover:bg-brown/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Abrindo portal..." : "Gerenciar Cobrança"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-600 hover:text-brown transition-colors cursor-pointer"
          >
            ← Voltar para início
          </button>
        </div>
      </div>
    </div>
  );
}

