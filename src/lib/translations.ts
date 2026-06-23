export const translations = {
  en: {
    title: "SURVIVOR LOG",
    subtitle: "Tactical Supply Inventory",
    add: "Log Item",
    placeholder: "Name of item...",
    categories: {
      food: "Rations",
      tools: "Ordnance",
      medicine: "Trauma Kit"
    },
    actions: {
      found: "SECURED",
      delete: "LOST",
      themeDay: "SURFACE OPS",
      themeNight: "STEALTH MODE"
    },
    empty: "Stockpile empty. Ready for scavenger mission.",
    stats: "Readout",
    total: "Total Load",
    secure: "Secured"
  },
  es: {
    title: "BITÁCORA",
    subtitle: "Inventario Táctico de Suministros",
    add: "Registrar",
    placeholder: "Nombre del objeto...",
    categories: {
      food: "Raciones",
      tools: "Herramientas",
      medicine: "Medicina"
    },
    actions: {
      found: "ASEGURADO",
      delete: "PERDIDO",
      themeDay: "MODO SUPERFICIE",
      themeNight: "MODO SIGILO"
    },
    empty: "Reserva vacía. Listo para misión de saqueo.",
    stats: "Informe",
    total: "Carga Total",
    secure: "Asegurado"
  }
};

export type Language = 'en' | 'es';