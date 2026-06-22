"use client";

import { useEffect, useState } from "react";
import refesData from "@/data/serie-salud.json";

interface TimeSeriesRow {
  anio: string;
  hospitales: number;
  salitas: number;
}

interface TopCiudad {
  ciudad: string;
  cantidad: number;
  color: string;
}

interface DetalleCiudad {
  hospital_destacado: string;
  salita_principal: string;
  zona_sanitaria: string;
}

export function HealthStats() {
  const [timeSeries, setTimeSeries] = useState<TimeSeriesRow[]>([]);
  const [topCiudades, setTopCiudades] = useState<TopCiudad[]>([]);
  const [detallesCiudades, setDetallesCiudades] = useState<Record<string, DetalleCiudad>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [selectedCiudad, setSelectedCiudad] = useState<string | null>("Quilmes");

  useEffect(() => {
    if (refesData && refesData.time_series && refesData.top_ciudades) {
      setTimeSeries(refesData.time_series as TimeSeriesRow[]);
      setTopCiudades(refesData.top_ciudades as TopCiudad[]);
      setDetallesCiudades((refesData.detalles_ciudades || {}) as Record<string, DetalleCiudad>);
      setLoading(false);
    } else {
      setError("El archivo JSON no contiene la estructura esperada del REFES.");
      setLoading(false);
    }
  }, []);

  const maxVal = timeSeries.length > 0 
    ? Math.max(...timeSeries.map(r => Math.max(r.hospitales, r.salitas))) 
    : 1;

  const totalTopHospitales = topCiudades.reduce((acc, c) => acc + c.cantidad, 0);
  
  let accumulatedAngle = 0;
  const pieSegments = topCiudades.map((ciudad) => {
    const percentage = (ciudad.cantidad / totalTopHospitales) * 100;
    const angle = (ciudad.cantidad / totalTopHospitales) * 360;
    const startAngle = accumulatedAngle;
    accumulatedAngle += angle;
    return { ...ciudad, percentage, startAngle, angle };
  });

  return (
    <section className="space-y-8 p-6 max-w-7xl mx-auto font-sans animate-in fade-in duration-300">
      
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <i className="fa fa-server text-[#0072b8]" aria-hidden="true"></i>
            Monitoreo Sanitario y Estadísticas Federales
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Datos consolidados del Registro Federal de Establecimientos de Salud (REFES)
          </p>
        </div>

        {loading && (
          <div className="w-full h-96 bg-slate-50 rounded flex items-center justify-center">
            <p className="text-sm font-medium text-slate-400 animate-pulse flex items-center gap-2">
              <i className="fa fa-spinner animate-spin"></i> Inicializando base de datos sanitarios...
            </p>
          </div>
        )}

        {error && (
          <div className="w-full h-96 bg-rose-50 rounded flex flex-col items-center justify-center p-6 text-center border border-rose-100">
            <i className="fa fa-exclamation-triangle text-rose-500 text-2xl mb-2"></i>
            <p className="text-sm font-bold text-rose-800">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-inner flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2 mb-2">
                    <i className="fa fa-line-chart text-[#0072b8]"></i>
                    Evolución Histórica de Infraestructura
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">Comparativa de Hospitales vs. Centros de Atención Primaria</p>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-3 border-b border-slate-300 pb-2 px-2 pt-8 bg-white rounded-lg border">
                  {timeSeries.map((row, idx) => {
                    const hHeight = (row.hospitales / maxVal) * 100;
                    const sHeight = (row.salitas / maxVal) * 100;

                    return (
                      <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center group relative">
                        <div className="w-full flex items-end justify-center gap-1 h-48 relative bg-slate-50/50 rounded-t-sm px-0.5">
                          <div className="absolute -top-14 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-30 whitespace-nowrap text-left leading-tight">
                            <span className="font-bold text-slate-300 block mb-0.5">Año {row.anio}:</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0072b8]"></span> Hosp: {row.hospitales}</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#2e7d32]"></span> Salitas: {row.salitas}</span>
                          </div>
                          <div style={{ height: `${Math.max(hHeight, 4)}%` }} className="w-1/2 bg-[#0072b8] rounded-t-sm transition-all duration-500 hover:bg-[#00558a] cursor-help shadow-sm" />
                          <div style={{ height: `${Math.max(sHeight, 4)}%` }} className="w-1/2 bg-[#2e7d32] rounded-t-sm transition-all duration-500 hover:bg-[#1b5e20] cursor-help shadow-sm" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 mt-2 select-none h-4">{row.anio}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-500 pt-2 select-none">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0072b8]"></span> Hospitales</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#2e7d32]"></span> Salitas / CAPs</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 shadow-inner flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2 mb-2">
                    <i className="fa fa-pie-chart text-[#1f91d6]"></i>
                    Distribución Geográfica en Zona Sur
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">Padrón de Región Sanitaria VI.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90 transform">
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="4" />
                      {pieSegments.map((seg, idx) => {
                        const strokeDasharray = `${seg.percentage} ${100 - seg.percentage}`;
                        const strokeDashoffset = 100 - seg.startAngle * (100 / 360) + 25;

                        return (
                          <circle
                            key={idx}
                            cx="21"
                            cy="21"
                            r="15.915"
                            fill="transparent"
                            stroke={seg.color}
                            strokeWidth={activeSegment === seg.ciudad || selectedCiudad === seg.ciudad ? "5.5" : "4.5"}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-300 cursor-pointer origin-center"
                            onMouseEnter={() => setActiveSegment(seg.ciudad)}
                            onMouseLeave={() => setActiveSegment(null)}
                            onClick={() => setSelectedCiudad(seg.ciudad)}
                          />
                        );
                      })}
                    </svg>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 select-none pointer-events-none">
                      <span className="text-xs font-black text-slate-700 leading-none truncate max-w-27.5">
                        {activeSegment || selectedCiudad || "Seleccioná"}
                      </span>
                      <span className="text-base font-extrabold text-[#0072b8] mt-1">
                        {topCiudades.find(c => c.ciudad === (activeSegment || selectedCiudad))?.cantidad || totalTopHospitales}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Centros</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 w-full sm:w-auto min-w-42.5">
                    {pieSegments.map((ciudad, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded transition-all select-none border cursor-pointer ${
                          selectedCiudad === ciudad.ciudad 
                            ? "bg-[#0072b8] text-white border-[#0072b8] shadow-sm translate-x-1" 
                            : activeSegment === ciudad.ciudad
                            ? "bg-white border-slate-200 text-slate-700 shadow-sm"
                            : "border-transparent text-slate-600 hover:bg-slate-100"
                        }`}
                        onMouseEnter={() => setActiveSegment(ciudad.ciudad)}
                        onMouseLeave={() => setActiveSegment(null)}
                        onClick={() => setSelectedCiudad(ciudad.ciudad)}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full block shrink-0 ${selectedCiudad === ciudad.ciudad ? "bg-white" : ""}`} style={selectedCiudad === ciudad.ciudad ? {} : { backgroundColor: ciudad.color }} />
                          <span className="text-xs font-bold truncate max-w-27.5">{ciudad.ciudad}</span>
                        </div>
                        <span className={`text-xs font-extrabold ${selectedCiudad === ciudad.ciudad ? "text-slate-100" : "text-slate-400"}`}>{ciudad.cantidad}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {selectedCiudad && detallesCiudades[selectedCiudad] && (
              <div className="bg-linear-to-r from-slate-50 to-white rounded-xl p-5 border border-slate-200 shadow-sm animate-in slide-in-from-bottom-3 duration-300">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <i className="fa fa-hospital-o text-[#0072b8] text-lg"></i>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Establecimientos de Referencia: Partidos de <span className="text-[#0072b8]">{selectedCiudad}</span>
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hospital General de Agudos</span>
                    <p className="text-xs font-extrabold text-slate-700 leading-tight">{detallesCiudades[selectedCiudad].hospital_destacado}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Unidad Sanitaria Primaria (CAPS)</span>
                    <p className="text-xs font-extrabold text-slate-700 leading-tight">{detallesCiudades[selectedCiudad].salita_principal}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Región de Salud PBA</span>
                    <p className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      {detallesCiudades[selectedCiudad].zona_sanitaria}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
          <span>Fuente Oficial: Ministerio de Salud PBA - Región Sanitaria VI</span>
          <span className="text-[#0072b8] flex items-center gap-1 font-bold">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            REFES Integrado Vía Estática Local
          </span>
        </div>
      </div>
    </section>
  );
}