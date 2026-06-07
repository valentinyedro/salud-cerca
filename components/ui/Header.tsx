"use client";

export function Header() {
  return (
    <header className="w-full bg-white border-b-4 border-[#0072b8] shadow-sm font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
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
            className="text-sm font-bold text-[#0072b8] uppercase tracking-wider border-b-2 border-[#0072b8] pb-1 cursor-pointer"
          >
            Mapa Interactivo
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