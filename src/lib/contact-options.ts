export const serviceOptions = [
  { slug: "consultoria", label: "Consultoría" },
  { slug: "automatizacion", label: "Automatización e integraciones" },
  { slug: "desarrollo", label: "Sistemas a medida" },
  { slug: "inteligencia-artificial", label: "IA aplicada" },
  { slug: "capacitacion", label: "Capacitación empresarial" },
  { slug: "consultoria-it", label: "Consultoría especializada IT" },
  { slug: "diagnostico", label: "Diagnóstico de digitalización e IA" },
  { slug: "mentoria", label: "Mentoría" },
  { slug: "no-estoy-seguro", label: "No estoy seguro" },
] as const;

export const sectorOptions = [
  { slug: "hoteleria", label: "Hoteles y posadas" },
  { slug: "inmobiliarias", label: "Inmobiliarias" },
  { slug: "turismo", label: "Agencias de turismo" },
  { slug: "comercios", label: "Comercios y servicios" },
] as const;

export function getServiceLabel(slug: unknown): string {
  return serviceOptions.find(option => option.slug === slug)?.label ?? "";
}

export function getSectorLabel(slug: unknown): string {
  return sectorOptions.find(option => option.slug === slug)?.label ?? "";
}
