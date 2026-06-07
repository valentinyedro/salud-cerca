"use client";

type FilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export function FilterButton({ isOpen, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-2 rounded bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 cursor-pointer shadow-sm"
    >
      <i className="fa fa-sliders" aria-hidden="true"></i>
      <span>
        {isOpen ? "Ocultar filtros de búsqueda" : "Mostrar filtros de búsqueda"}
      </span>
      <i 
        className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} ml-1 text-slate-400 text-xs transition-transform`} 
        aria-hidden="true"
      ></i>
    </button>
  );
}