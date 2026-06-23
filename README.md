
# 💀 DEAD DROP LOOT - Tactical Survival Inventory

**Dead Drop Loot** es una herramienta de gestión de suministros diseñada para entornos de supervivencia hardcore. Inspirada en la estética industrial-brutalista de los videojuegos de supervivencia táctica, la aplicación ofrece una interfaz optimizada para el registro rápido de recursos críticos: Medicina, Herramientas y Raciones.

## 🚀 Misión
Proporcionar una bitácora digital que funcione como una extensión del equipo táctico del superviviente, permitiendo un control total del inventario con una UI de alta fidelidad y rendimiento óptimo.

## 🛠️ Stack Tecnológico
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **Animations:** Framer Motion (para transiciones tácticas suaves)
- **Language:** TypeScript
- **State:** React Hooks + LocalStorage Persistence

## 📦 Instalación y Uso

La aplicación es compatible con `npm`, `yarn` y `pnpm`.

```bash
# Instalar dependencias
pnpm install  # o yarn install / npm install

# Iniciar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 🧠 Lógica de la Aplicación
1. **Persistencia Local:** Todos los datos se guardan en el `localStorage`, garantizando que el inventario persista entre sesiones sin necesidad de backend (ideal para operaciones offline).
2. **Arquitectura Táctica (Taste Skill):**
   - **Contención Estricta:** Implementación de reglas de overflow-hidden y break-words para evitar roturas de layout en móviles.
   - **Duality Theme:** Cambio instantáneo entre *Surface Ops* (Modo Día) y *Stealth Mode* (Modo Noche) con transiciones de 0.5s.
   - **Sistema de Slots:** Los ítems no son simples listas, son "registros de campo" con animaciones de tachado al ser asegurados.

## 📈 Futuro Escalable
- **Sincronización en la Nube:** Integración con Firebase Firestore para compartir inventarios entre miembros de una "facción".
- **Sistema de Peso:** Cálculo automático de carga (Loadout) basado en el tipo de objeto.
- **Geolocalización:** Registro de coordenadas de "Dead Drops" (puntos de entrega) en un mapa integrado.
- **Modo Offline PWA:** Convertir la app en una PWA completa para uso sin red en el campo.

---
*Protocolo de Seguridad 00-Z activo. Registra tus suministros. Asegura tu supervivencia.*
