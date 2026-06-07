import type { Establishment, EstablishmentType } from "@/lib/types";

export type EstablishmentTypeFilter = EstablishmentType[] | "all";

export function filterEstablishmentsByTypes(
  establishments: Establishment[],
  selectedTypes: EstablishmentTypeFilter
): Establishment[] {
  if (selectedTypes === "all") {
    return establishments;
  }

  if (selectedTypes.length === 0) {
    return [];
  }

  const selectedTypesLower = selectedTypes.map((type) => type.toLowerCase());

  return establishments.filter((establishment) =>{
    if (!establishment.tipo) return false;

    const tipoNormalizado = establishment.tipo.toLowerCase();

    return selectedTypesLower.includes(tipoNormalizado);
  });
}