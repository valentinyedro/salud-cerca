"use client";

import { useMemo, useState } from "react";
import type { Establishment, EstablishmentType } from "@/lib/types";
import { filterEstablishmentsByTypes } from "@/lib/filters";
import {
  orientationRules,
  type OrientationNeed,
} from "@/lib/orientationRules";
import { Header } from "@/components/ui/Header";
import { MapClient } from "@/components/map/MapClient";
import { FilterButton } from "@/components/filters/FilterButton";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { EstablishmentDetail } from "@/components/establishments/EstablishmentDetail";
import { OrientationButton } from "@/components/orientation/OrientationButton";
import { OrientationPanel } from "@/components/orientation/OrientationPanel";

import { MapSection } from "@/components/map/MapSection";
import { MedicationSection } from "@/components/medication/MedicationSection";
import type { ViewType } from "@/lib/types";

export type SelectedEstablishmentTypes = EstablishmentType[] | "all";

type SaludCercaAppProps = {
  establishments: Establishment[];
};

export function SaludCercaApp({ establishments }: SaludCercaAppProps) {
  const [selectedTypes, setSelectedTypes] =
    useState<SelectedEstablishmentTypes>("all");

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<Establishment | null>(null);

  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
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

/*   function handleOrientationSelect(need: OrientationNeed) {
    const rule = orientationRules[need];

    setSelectedTypes(rule.establishmentTypes);
    setSelectedEstablishment(null);
    setIsOrientationOpen(false);
  }
 */

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header activeView={activeView} onViewChange={setActiveView} />

  {
/*       <section className="space-y-4 p-4">

        <div className="space-y-2">
          <FilterButton
            isOpen={isFiltersOpen}
            onClick={() => setIsFiltersOpen((current) => !current)}
          />
          
          {isFiltersOpen && (
            <FilterPanel
              selectedTypes={selectedTypes}
              onTypesChange={handleTypesChange}
            />
          )}
        </div>

        <MapClient
          establishments={filteredEstablishments}
          onSelectEstablishment={setSelectedEstablishment}
        />

        <OrientationButton
          isOpen={isOrientationOpen}
          onClick={() => setIsOrientationOpen((current) => !current)}
        />

        {isOrientationOpen && (
          <OrientationPanel onSelectNeed={handleOrientationSelect} />
        )}

        <EstablishmentDetail
          establishment={selectedEstablishment}
          onClose={() => setSelectedEstablishment(null)}
        />

        <div className="rounded-lg border p-4">
          <h2 className="mb-2 text-base font-semibold">
            Establecimientos visibles
          </h2>

          <p className="text-sm text-slate-600">
            Total: {filteredEstablishments.length}
          </p>
        </div>
      </section>
 */
  }
  
      {activeView === "mapa" && <MapSection establishments={establishments} />}

      {activeView === "medicamentos" && <MedicationSection />}

    </main>
  );
}