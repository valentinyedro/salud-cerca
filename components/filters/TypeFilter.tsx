"use client";

import type { EstablishmentType } from "@/lib/types";

type TypeFilterProps = {
  selectedTypes: EstablishmentType[] | "all";
  onChange: (types: EstablishmentType[] | "all") => void;
};

const typeOptions: {
  label: string;
  value: EstablishmentType;
  icon: string;
}[] = [
  { label: "Hospitales", value: "hospital", icon: "fa fa-heartbeat text-red-600" },
  { label: "Centros de salud", value: "centro_salud", icon: "fa fa-user-md text-blue-600" },
  { label: "Farmacias", value: "farmacia", icon: "fa fa-ambulance text-emerald-600" },
  
];

export function TypeFilter({ selectedTypes, onChange }: TypeFilterProps) {
  const activeTypes =
    selectedTypes === "all"
      ? typeOptions.map((option) => option.value)
      : selectedTypes;

  function handleToggle(type: EstablishmentType) {
    if (selectedTypes === "all") {
      const nextTypes = activeTypes.filter((activeType) => activeType !== type);
      onChange(nextTypes);
      return;
    }

    const isSelected = selectedTypes.includes(type);

    const nextTypes = isSelected
      ? selectedTypes.filter((selectedType) => selectedType !== type)
      : [...selectedTypes, type];

    onChange(nextTypes);
  }

  function handleSelectAll() {
    onChange("all");
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={handleSelectAll}
        className={[
          "rounded-full border px-3 py-2 text-sm transition inline-flex items-center gap-2",
          selectedTypes === "all"
            ? "border-slate-900 bg-slate-900 text-white"
            : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
        ].join(" ")}
      >
        <i className="fa fa-map text-slate-500" aria-hidden="true"></i>
        Todos
      </button>

      {typeOptions.map((option) => {
        const isActive = activeTypes.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            className={[
              "rounded-full border px-3 py-2 text-sm transition inline-flex items-center gap-2",
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-300 bg-white text-slate-700 opacity-60",
            ].join(" ")}
          >
            <i className={option.icon} aria-hidden="true"></i>
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
