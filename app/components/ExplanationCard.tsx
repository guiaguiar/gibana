export default function ExplanationCard() {
  return (
    <div className="group relative w-full">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brown/20 via-brown/10 to-transparent opacity-60 blur-3xl -z-10 transition-opacity duration-500 group-hover:opacity-80" />

      {/* Main card container */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm border border-white/50 shadow-xl shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1">
        {/* Content */}
        <div className="relative p-8 md:p-10 flex flex-col gap-8">
          {/* Section: O que é um Print Club? */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-2xl md:text-3xl text-brown transition-all duration-300">
                O que é um Print Club?
              </h3>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                Print Club é um clube de assinatura mensal, onde você recebe
                todos os meses uma carta por correio com o print A5 de uma arte
                e outros itens feitos e projetados todos por mim, Gibana.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                A ideia é tornar a minha arte mais acessível e você receber algo
                exclusivo e original.
              </p>
            </div>
          </div>

          {/* Section: Como funciona o envio? */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-2xl md:text-3xl text-brown transition-all duration-300">
                Como funciona o envio?
              </h3>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                As correspondências serão enviadas até o dia 15 de cada mês.
                Você deve se inscrever até o dia 12 do mês, para receber a
                impressão daquele mês.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                O frete é grátis para todo o Brasil, para manter o valor
                acessível as cartas não incluem informações de rastreamento.
              </p>
            </div>
          </div>

          {/* Section: Vocês aceitam reembolso e devoluções? */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-2xl md:text-3xl text-brown transition-all duration-300">
                Vocês aceitam reembolso e devoluções?
              </h3>
            </div>
            <div className="flex flex-col gap-3 pl-0 md:pl-4">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
                <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                  <span className="font-medium">
                    Em caso de encomenda danificada:
                  </span>{" "}
                  por favor, entre em contato comigo e envie fotos e detalhes,
                  encontraremos a melhor solução juntos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-brown shrink-0" />
                <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-2xl">
                  <span className="font-medium">
                    Para correspondências extraviadas:
                  </span>{" "}
                  terei prazer em reenviar sua correspondência.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
