"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";
import IconButton from "@/app/components/IconButton";
import {
  getCurrentUser,
  signOut,
  type AuthResult,
} from "@/app/actions/auth";
import { getUserSubscriptions, type Subscription } from "@/app/actions/stripe";

export default function MinhaContaPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AuthResult["user"] | null>(
    null
  );
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push("/");
          return;
        }
        setCurrentUser(user);

        if (user.stripeCustomerId) {
          const subs = await getUserSubscriptions(user.stripeCustomerId);
          setSubscriptions(subs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    setCurrentUser(null);
    setUserMenuOpen(false);
    router.push("/");
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest(".user-menu-container")) {
          setUserMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: currency.toUpperCase() === "BRL" ? "BRL" : "USD",
    }).format(amount / 100);
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      active: "Ativa",
      past_due: "Vencida",
      canceled: "Cancelada",
      unpaid: "Não paga",
      trialing: "Período de teste",
      incomplete: "Incompleta",
      incomplete_expired: "Expirada",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string): string => {
    if (status === "active") return "text-green-600 bg-green-50";
    if (status === "past_due" || status === "unpaid") return "text-red-600 bg-red-50";
    if (status === "canceled") return "text-gray-600 bg-gray-50";
    return "text-yellow-600 bg-yellow-50";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="px-8 py-8 min-h-screen">
      <div className="flex items-center justify-between pb-10 pt-4">
        <div className="relative user-menu-container">
          <IconButton
            icon="solar:user-broken"
            aria-label="User menu"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          />
          {userMenuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px] z-10">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <button
                onClick={() => router.push("/")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Voltar para início
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Sair
              </button>
            </div>
          )}
        </div>
        <Image src={logo} alt="logo" width={100} height={100} />
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Minha Conta</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Informações da Conta</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Nome:</span> {currentUser.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {currentUser.email}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Minhas Assinaturas</h2>

          {subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                Você não possui assinaturas ativas.
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-brown text-white px-6 py-2 rounded-md hover:bg-brown/90 transition-colors"
              >
                Ver Produtos
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {subscription.product.name}
                      </h3>
                      {subscription.product.description && (
                        <p className="text-gray-600 mb-3">
                          {subscription.product.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Valor:</span>{" "}
                          {formatPrice(
                            subscription.price.amount,
                            subscription.price.currency
                          )}
                          {subscription.price.interval && (
                            <span> / {subscription.price.interval}</span>
                          )}
                        </div>
                        <div>
                          <span className="font-medium">Próximo pagamento:</span>{" "}
                          {formatDate(subscription.current_period_end)}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          subscription.status
                        )}`}
                      >
                        {getStatusLabel(subscription.status)}
                      </span>
                      {subscription.cancel_at_period_end && (
                        <span className="text-xs text-orange-600">
                          Será cancelada ao final do período
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

