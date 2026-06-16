"use client";

import { useMemo, useState } from "react";
import rawMedications from "@/data/medications.json";
import type { Medication } from "@/lib/types";

function normalizeRaw(r: Record<string, any>): Medication {
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

const allMeds: Medication[] = (rawMedications as any[]).map(normalizeRaw);

export function MedicationSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<
    "copay" | "coverage" | "price" | "presentation" | null
  >(null);
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
    return allMeds.filter((m) => (q ? m.activeIngredient.toLowerCase().includes(q) : true));
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

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  // keep currentPage in range when pageSize or filtered change
  if (currentPage > totalPages) setCurrentPage(1);

  function applySearch(q?: string) {
    setAppliedQuery(q ?? searchQuery);
    setCurrentPage(1);
  }

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Medicamentos</h2>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-4">
          <div className="flex flex-col gap-2 items-start">
          <label className="text-sm font-medium">Buscar Principio activo:</label>
          <div className="flex items-center gap-2 w-full">
            <input
              aria-label="Buscar principio activo"
              className="border px-2 py-1 rounded flex-1"
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
              className="bg-[#0072b8] text-white px-3 py-1 rounded"
            >
              Buscar
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="mt-1 bg-white border rounded shadow-sm max-h-40 overflow-auto w-full">
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="px-2 py-1 hover:bg-slate-100 cursor-pointer text-sm"
                  onClick={() => {
                    setSearchQuery(s);
                    applySearch(s);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Mostrar:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
            aria-label="Tamaño de página"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">Ordenar por:</label>
          <select
            value={sortField ?? ""}
            onChange={(e) => setSortField((e.target.value as any) || null)}
            className="border px-2 py-1 rounded"
            aria-label="Ordenar por"
          >
            <option value="">(sin orden)</option>
            <option value="copay">Importe Afiliado</option>
            <option value="coverage">Cobertura</option>
            <option value="price">PVP PAMI</option>
            <option value="presentation">Presentación</option>
          </select>

          <button
            type="button"
            onClick={() => setSortDirection((d) => (d === "asc" ? "desc" : "asc"))}
            className="border px-2 py-1 rounded"
            aria-label="Alternar dirección de orden"
          >
            {sortDirection === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded">
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
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-slate-500">
                  No se encontraron medicamentos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 gap-3">
        <div className="text-sm text-slate-600">
          Mostrando {Math.min(total, (currentPage - 1) * pageSize + 1)}-
          {Math.min(total, currentPage * pageSize)} de {total}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="border px-2 py-1 rounded disabled:opacity-50"
            aria-label="Página anterior"
          >
            Anterior
          </button>

          <span className="text-sm">
            Página {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="border px-2 py-1 rounded disabled:opacity-50"
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}
 