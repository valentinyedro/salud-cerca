import type { Establishment } from "@/lib/types";

type EstablishmentDetailProps = {
  establishment: Establishment | null;
  onClose: () => void;
};

const typeLabels: Record<Establishment["tipo"], string> = {
  hospital: "Hospital",
  centro_salud: "Centro de salud",
  farmacia: "Farmacia",

};

export function EstablishmentDetail({
  establishment,
  onClose,
}: EstablishmentDetailProps) {
  if (!establishment) {
    return null;
  }

  return (
    <section className="rounded-lg border bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold">{establishment.nombre}</h2>
          <p className="text-sm text-slate-600">
            {typeLabels[establishment.tipo]}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md border px-2 py-1 text-sm"
        >
          Cerrar
        </button>
      </div>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Dirección:</span>{" "}
          {establishment.direccion}
        </p>

        <p>
          <span className="font-medium">Localidad:</span>{" "}
          {establishment.localidad}
        </p>

        <p>
          <span className="font-medium">Provincia:</span>{" "}
          {establishment.provincia}
        </p>
      </div>
    </section>
  );
}