"use client";

import { useMemo, useState } from "react";
import type {
  Establishment,
  SelectedEstablishmentTypes,
  ViewType,
} from "@/lib/types";
import { filterEstablishmentsByTypes } from "@/lib/filters";
import { Header } from "@/components/ui/Header";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { MapSection } from "@/components/map/MapSection";
import { MedicationSection } from "@/components/medication/MedicationSection";

type SaludCercaAppProps = {
  establishments: Establishment[];
};

export function SaludCercaApp({ establishments }: SaludCercaAppProps) {
  const [selectedTypes, setSelectedTypes] =
    useState<SelectedEstablishmentTypes>("all");

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<Establishment | null>(null);

  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>("mapa");

  const filteredEstablishments = useMemo(
    () => filterEstablishmentsByTypes(establishments, selectedTypes),
    [establishments, selectedTypes]
  );

  function handleTypesChange(types: SelectedEstablishmentTypes) {
    setSelectedTypes(types);
    setSelectedEstablishment(null);
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen((current) => !current)}
        canShowFilters={activeView === "mapa"}
        filterPanelId="map-filters"
      />

      {activeView === "mapa" && isFiltersOpen && (
        <div id="map-filters" className="p-4 pb-0 md:hidden">
          <FilterPanel
            selectedTypes={selectedTypes}
            onTypesChange={handleTypesChange}
          />
        </div>
      )}

      {activeView === "mapa" && (
        <MapSection
          establishments={filteredEstablishments}
          selectedTypes={selectedTypes}
          onTypesChange={handleTypesChange}
          selectedEstablishment={selectedEstablishment}
          onSelectEstablishment={setSelectedEstablishment}
          onCloseEstablishment={() => setSelectedEstablishment(null)}
          isFiltersOpen={isFiltersOpen}
          onToggleFilters={() => setIsFiltersOpen((current) => !current)}
        />
      )}

      {activeView === "medicamentos" && <MedicationSection />}
    </main>
  );
}
