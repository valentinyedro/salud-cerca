export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-4 py-3">
      <div className="w-8" />

      <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
        <i className="fa fa-plus-square text-blue-900" aria-hidden="true"></i>
        Salud Cerca
      </h1>

      <button
        type="button"
        className="rounded-md border px-3 py-1 text-sm"
      >
        Filtros
      </button>
    </header>
  );
}