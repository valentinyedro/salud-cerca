export type EstablishmentType = "hospital" | "centro_salud" | "farmacia"
;

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