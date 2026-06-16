"use client";

import type { ViewType } from "@/lib/types";

type HeaderProps = {
  activeView: ViewType;
  onViewChange: (v: ViewType) => void;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
  canShowFilters: boolean;
  filterPanelId: string;
};

export function Header({
  activeView,
  onViewChange,
  isFiltersOpen,
  onToggleFilters,
  canShowFilters,
  filterPanelId,
}: HeaderProps) {
  const filterLabel = isFiltersOpen ? "Ocultar filtros" : "Mostrar filtros";

  return (
    <header className="w-full bg-white border-b-4 border-[#0072b8] shadow-sm font-sans">
      <div className="mx-auto md:hidden">
        <div className="grid grid-cols-[44px_1fr_44px] items-center px-4 py-3">
          <div>
            {canShowFilters && (
              <button
                type="button"
                aria-label={filterLabel}
                aria-expanded={isFiltersOpen}
                aria-controls={filterPanelId}
                onClick={onToggleFilters}
                className="inline-flex h-10 w-10 items-center justify-center rounded bg-slate-800 text-white shadow-sm transition hover:bg-slate-700"
              >
                <i className="fa fa-sliders" aria-hidden="true"></i>
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 select-none">
            <div className="bg-[#0072b8] text-white p-2 rounded-md shadow-sm">
              <i className="fa fa-plus-square text-lg" aria-hidden="true"></i>
            </div>
            <div className="min-w-0 text-center">
              <span className="block text-lg font-extrabold leading-none tracking-tight text-slate-900">
                SALUD CERCA
              </span>
              <span className="mt-1 block text-[9px] font-bold uppercase tracking-widest text-slate-400">
                Localiza tu servicio
              </span>
            </div>
          </div>

          <a
            href="tel:107"
            aria-label="Llamar a Emergencias 107"
            className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded bg-[#e11d48] text-white shadow-sm transition hover:bg-[#be123c]"
          >
            <i className="fa fa-phone" aria-hidden="true"></i>
          </a>
        </div>

        <nav className="grid grid-cols-2 border-t border-slate-100">
          <button
            type="button"
            title="Mapa"
            aria-pressed={activeView === "mapa"}
            onClick={() => onViewChange("mapa")}
            className={
              "px-3 py-3 text-xs font-bold uppercase tracking-wider " +
              (activeView === "mapa"
                ? "bg-slate-50 text-[#0072b8]"
                : "text-slate-500 hover:bg-slate-50 hover:text-[#0072b8]")
            }
          >
            Mapa
          </button>

          <button
            type="button"
            title="Medicamentos"
            aria-pressed={activeView === "medicamentos"}
            onClick={() => onViewChange("medicamentos")}
            className={
              "border-l border-slate-100 px-3 py-3 text-xs font-bold uppercase tracking-wider " +
              (activeView === "medicamentos"
                ? "bg-slate-50 text-[#0072b8]"
                : "text-slate-500 hover:bg-slate-50 hover:text-[#0072b8]")
            }
          >
            Medicamentos
          </button>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto hidden items-center justify-between px-8 py-5 md:flex">
        <div className="flex items-center gap-3 select-none">
          <div className="bg-[#0072b8] text-white p-2.5 rounded-md shadow-sm">
            <i className="fa fa-plus-square text-xl" aria-hidden="true"></i>
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 block leading-none">
              SALUD CERCA
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-1">
              Localiza tu servicio
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          <button
            type="button"
            id="mapa"
            title="Mapa"
            aria-pressed={activeView === "mapa"}
            onClick={() => onViewChange("mapa")}
            className={
              "text-sm font-bold uppercase tracking-wider pb-1 cursor-pointer " +
              (activeView === "mapa"
                ? "text-[#0072b8] border-b-2 border-[#0072b8]"
                : "text-slate-400 hover:text-[#0072b8] hover:border-b-2 transition-colors")
            }
          >
            Mapa Interactivo
          </button>

          <button
            type="button"
            id="medicamentos"
            title="Medicamentos"
            aria-pressed={activeView === "medicamentos"}
            onClick={() => onViewChange("medicamentos")}
            className={
              "text-sm font-bold uppercase tracking-wider pb-1 cursor-pointer " +
              (activeView === "medicamentos"
                ? "text-[#0072b8] border-b-2 border-[#0072b8]"
                : "text-slate-400 hover:text-[#0072b8] hover:border-b-2 transition-colors")
            }
          >
            Medicamentos
          </button>


          <button
            type="button"
            disabled
            className="text-sm font-bold text-slate-400 uppercase tracking-wider pb-1 cursor-not-allowed hover:text-slate-500 transition-colors"
            title="Próximamente"
          >
            Otra info
          </button>

          <button
            type="button"
            disabled
            className="text-sm font-bold text-slate-400 uppercase tracking-wider pb-1 cursor-not-allowed hover:text-slate-500 transition-colors"
            title="Próximamente"
          >
            Contacto
          </button>

          <a
            href="tel:107"
            className="ml-2 inline-flex items-center gap-2 rounded bg-[#e11d48] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#be123c] shadow-sm animate-pulse"
          >
            <i className="fa fa-phone" aria-hidden="true"></i>
            Emergencias 107
          </a>
        </nav>

      </div>
    </header>
  );
}
