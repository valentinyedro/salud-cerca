"use client";

import { useState } from "react";
import type { Establishment, SelectedEstablishmentTypes } from "@/lib/types";
import {
  orientationRules,
  type OrientationNeed,
} from "@/lib/orientationRules";
import { MapClient } from "@/components/map/MapClient";
import { FilterButton } from "@/components/filters/FilterButton";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { EstablishmentDetail } from "@/components/establishments/EstablishmentDetail";
import { OrientationButton } from "@/components/orientation/OrientationButton";
import { OrientationPanel } from "@/components/orientation/OrientationPanel";

type MapSectionProps = {
  establishments: Establishment[];
  selectedTypes: SelectedEstablishmentTypes;
  onTypesChange: (types: SelectedEstablishmentTypes) => void;
  selectedEstablishment: Establishment | null;
  onSelectEstablishment: (establishment: Establishment) => void;
  onCloseEstablishment: () => void;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
};

export function MapSection({
  establishments,
  selectedTypes,
  onTypesChange,
  selectedEstablishment,
  onSelectEstablishment,
  onCloseEstablishment,
  isFiltersOpen,
  onToggleFilters,
}: MapSectionProps) {
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);

  function handleOrientationSelect(need: OrientationNeed) {
    const rule = orientationRules[need];

    onTypesChange(rule.establishmentTypes);
    setIsOrientationOpen(false);
  }

  return (
    <section className="space-y-4 p-4">
      <div className="hidden space-y-2 md:block">
        <FilterButton isOpen={isFiltersOpen} onClick={onToggleFilters} />

        {isFiltersOpen && (
          <FilterPanel
            selectedTypes={selectedTypes}
            onTypesChange={onTypesChange}
          />
        )}
      </div>

      <MapClient
        establishments={establishments}
        onSelectEstablishment={onSelectEstablishment}
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
        onClose={onCloseEstablishment}
      />

      <div className="rounded-lg border p-4">
        <h2 className="mb-2 text-base font-semibold">
          Establecimientos visibles
        </h2>

        <p className="text-sm text-slate-600">
          Total: {establishments.length}
        </p>
      </div>
    </section>
  );
}
