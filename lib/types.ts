export type EstablishmentType = "hospital" | "centro_salud" | "farmacia";

export type SelectedEstablishmentTypes = EstablishmentType[] | "all";

export type Establishment = {
  id: string;
  nombre: string;
  tipo: EstablishmentType;
  direccion: string;
  localidad: string;
  provincia: string;
  lat: number;
  lon: number;
};

export type ViewType = "mapa" | "medicamentos" | "estadisticas";

export type Medication = {
  code: number;
  activeIngredient: string;
  brand: string;
  presentation: string;
  laboratory: string;
  price: string;
  coverage: string;
  copay: string;
};
