"use client";

import { useState } from "react";

type Period = "mensual" | "trimestral";

type Plan = {
  name: string;
  sessions: number;
  monthly: number;
  quarterly: number;
  popular?: boolean;
};

/** Price list in USDT (base 5 USDT per session a month; quarterly ≈ 15 % off). */
const PLANS: Plan[] = [
  { name: "Individual", sessions: 1, monthly: 5, quarterly: 13 },
  { name: "Dúo", sessions: 2, monthly: 9, quarterly: 23 },
  { name: "Equipo", sessions: 5, monthly: 20, quarterly: 51, popular: true },
  { name: "Clan", sessions: 10, monthly: 35, quarterly: 89 },
  { name: "Guild", sessions: 20, monthly: 60, quarterly: 150 },
];

function fmt(n: number): string {
  return n.toLocaleString("es", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}

export function Pricing() {
  const [period, setPeriod] = useState<Period>("mensual");
  const quarterly = period === "trimestral";

  return (
    <div>
      <div role="tablist" aria-label="Periodo de pago" className="inline-flex border border-[var(--line)] p-1">
        {(["mensual", "trimestral"] as const).map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={period === p}
            onClick={() => setPeriod(p)}
            className={`px-5 py-2 font-[family-name:var(--font-display)] text-sm tracking-wide transition ${
              period === p ? "bg-brass text-ink" : "text-mist hover:text-brass"
            }`}
          >
            {p === "mensual" ? "Mensual · 30 días" : "Trimestral · 90 días"}
            {p === "trimestral" && <span className={period === p ? " text-ink/70" : " text-emerald"}> −15 %</span>}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((plan) => {
          const price = quarterly ? plan.quarterly : plan.monthly;
          const perSession = plan.monthly / plan.sessions;
          const saved = plan.monthly * 3 - plan.quarterly;
          return (
            <li
              key={plan.name}
              className={`relative flex flex-col border p-5 ${
                plan.popular ? "border-brass bg-brass/[0.07]" : "border-[var(--line)] bg-ink-soft/60"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-5 bg-brass px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink uppercase">
                  Popular
                </span>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-mist">
                {plan.sessions} {plan.sessions === 1 ? "sesión" : "sesiones"}
              </p>
              <p className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold text-brass tabular-nums">
                {price}
                <span className="ml-1 text-sm font-semibold text-brass-dim">USDT</span>
              </p>
              <p className="mt-1 text-sm text-mist tabular-nums">
                {quarterly
                  ? `ahorras ${fmt(saved)} USDT`
                  : plan.sessions === 1
                    ? "precio base"
                    : `${perSession.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} por sesión`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
