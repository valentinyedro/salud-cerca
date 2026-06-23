"use client";

import { useMemo, useState } from "react";
import rawMedications from "@/data/medications.json";
import type { Medication } from "@/lib/types";

type RawMedication = {
  Alfabeta?: string | number;
  "Principio activo"?: string;
  "Marca Comercial"?: string;
  Presentacion?: string;
  Laboratorio?: string;
  "PVP PAMI"?: string;
  Cobertura?: string;
  "Importe afiliado"?: string;
};

type SortField = "copay" | "coverage" | "price" | "presentation";

function normalizeRaw(r: RawMedication): Medication {
  return {
    code: Number(r["Alfabeta"]) || 0,
    activeIngredient: r["Principio activo"] ?? "",
    brand: r["Marca Comercial"] ?? "",
    presentation: r["Presentacion"] ?? "",
    laboratory: r["Laboratorio"] ?? "",
    price: r["PVP PAMI"] ?? "",
    coverage: r["Cobertura"] ?? "",
    copay: r["Importe afiliado"] ?? "",
  };
}

function parseCurrency(s: string) {
  if (!s) return 0;
  const cleaned = String(s).replace(/[^\d.,-]/g, "").replace(",", ".");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function parsePercent(s: string) {
  if (!s) return 0;
  const cleaned = String(s).replace("%", "").trim();
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

const allMeds: Medication[] = (rawMedications as RawMedication[]).map(
  normalizeRaw
);

export function MedicationSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // suggestions based on typing (predictive, from `Principio activo`)
  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as string[];
    const set = new Set<string>();
    for (const m of allMeds) {
      const a = (m.activeIngredient || "").toLowerCase();
      if (a.startsWith(q) || a.includes(q)) {
        set.add(m.activeIngredient);
        if (set.size >= 8) break;
      }
    }
    return Array.from(set);
  }, [searchQuery]);

  const filtered = useMemo(() => {
    const q = appliedQuery.trim().toLowerCase();
    return allMeds.filter((m) =>
      q ? m.activeIngredient.toLowerCase().includes(q) : true
    );
  }, [appliedQuery]);

  const sorted = useMemo(() => {
    if (!sortField) return filtered;
    const arr = [...filtered];
    arr.sort((a, b) => {
      let va: number | string = "";
      let vb: number | string = "";
      switch (sortField) {
        case "copay":
          va = parseCurrency(a.copay);
          vb = parseCurrency(b.copay);
          break;
        case "price":
          va = parseCurrency(a.price);
          vb = parseCurrency(b.price);
          break;
        case "coverage":
          va = parsePercent(a.coverage);
          vb = parsePercent(b.coverage);
          break;
        case "presentation":
          va = a.presentation;
          vb = b.presentation;
          break;
      }

      if (typeof va === "number" && typeof vb === "number") {
        return sortDirection === "asc" ? va - vb : vb - va;
      } else {
        return sortDirection === "asc"
          ? String(va).localeCompare(String(vb))
          : String(vb).localeCompare(String(va));
      }
    });
    return arr;
  }, [filtered, sortField, sortDirection]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pageData = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, safeCurrentPage, pageSize]);

  const ul = window.document.getElementsByTagName("ul")[0];

  function applySearch(q?: string) {
    setAppliedQuery(q ?? searchQuery);
    setCurrentPage(1);

  }

  function hideSuggestions() {
    if (ul.style.display === "none" || ul.style.display === ""  ) 
      { ul.style.display = "block";} 
    else {    ul.style.display = "none";}  
  }

  return (
    <section className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="mb-4 space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">Medicamentos</h2>
        <p className="text-sm text-slate-600">
          Consultá medicamentos por principio activo y revisá cobertura,
          precio e importe afiliado.
        </p>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-end">
          <div className="relative flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">
              Buscar principio activo
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                aria-label="Buscar principio activo"
                className="min-h-10 flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applySearch();
                  }
                }}
                placeholder="Principio activo..."
              />
              <button
                type="button"
                onClick={() => applySearch()}
                className="min-h-10 rounded bg-[#0072b8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#005a91]"
              >
                Buscar
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-[1000] mt-1 max-h-44 overflow-auto rounded border border-slate-200 bg-white shadow-sm">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-slate-100"
                    onClick={() => {
                      setSearchQuery(s);
                      applySearch(s);
                      hideSuggestions();
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-2 sm:max-w-40">
            <label className="text-sm font-medium text-slate-800">
              Mostrar
            </label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="min-h-10 rounded border border-slate-300 px-3 py-2 text-sm"
              aria-label="Tamaño de página"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">
              Ordenar por
            </label>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <select
                value={sortField ?? ""}
                onChange={(e) =>
                  setSortField(
                    e.target.value === "" ? null : (e.target.value as SortField)
                  )
                }
                className="min-h-10 rounded border border-slate-300 px-3 py-2 text-sm"
                aria-label="Ordenar por"
              >
                <option value="">Predeterminado</option>
                <option value="copay">Importe afiliado</option>
                <option value="coverage">Cobertura</option>
                <option value="price">PVP PAMI</option>
                <option value="presentation">Presentación</option>
              </select>

              <button
                type="button"
                onClick={() =>
                  setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
                }
                className="min-h-10 rounded border border-slate-300 px-3 py-2 text-sm"
                aria-label="Alternar dirección de orden"
              >
                {sortDirection === "asc" ? "Asc" : "Desc"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {pageData.map((m) => (
          <article
            key={m.code}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900">
                {m.brand || "Sin marca"}
              </h3>
              <p className="text-sm text-slate-600">{m.activeIngredient}</p>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Código
                </dt>
                <dd className="mt-1 text-slate-900">{m.code}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Cobertura
                </dt>
                <dd className="mt-1 text-slate-900">{m.coverage}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Precio
                </dt>
                <dd className="mt-1 text-slate-900">{m.price}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Importe afiliado
                </dt>
                <dd className="mt-1 text-slate-900">{m.copay}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Presentación
                </dt>
                <dd className="mt-1 text-slate-900">{m.presentation}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-medium uppercase text-slate-500">
                  Laboratorio
                </dt>
                <dd className="mt-1 text-slate-900">{m.laboratory}</dd>
              </div>
            </dl>
          </article>
        ))}

        {pageData.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white px-3 py-6 text-center text-sm text-slate-500">
            No se encontraron medicamentos.
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block">
        <table className="min-w-full divide-y">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-sm">Código</th>
              <th className="px-3 py-2 text-left text-sm">Principio activo</th>
              <th className="px-3 py-2 text-left text-sm">Marca</th>
              <th className="px-3 py-2 text-left text-sm">Presentación</th>
              <th className="px-3 py-2 text-left text-sm">Laboratorio</th>
              <th className="px-3 py-2 text-left text-sm">Precio</th>
              <th className="px-3 py-2 text-left text-sm">Cobertura</th>
              <th className="px-3 py-2 text-left text-sm">Importe Afiliado</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y">
            {pageData.map((m) => (
              <tr key={m.code}>
                <td className="px-3 py-2 text-sm">{m.code}</td>
                <td className="px-3 py-2 text-sm">{m.activeIngredient}</td>
                <td className="px-3 py-2 text-sm">{m.brand}</td>
                <td className="px-3 py-2 text-sm">{m.presentation}</td>
                <td className="px-3 py-2 text-sm">{m.laboratory}</td>
                <td className="px-3 py-2 text-sm">{m.price}</td>
                <td className="px-3 py-2 text-sm">{m.coverage}</td>
                <td className="px-3 py-2 text-sm">{m.copay}</td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  No se encontraron medicamentos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          Mostrando {Math.min(total, (safeCurrentPage - 1) * pageSize + 1)}-
          {Math.min(total, safeCurrentPage * pageSize)} de {total}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage === 1}
            className="rounded border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <span className="text-center text-sm">
            Página {safeCurrentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
 
