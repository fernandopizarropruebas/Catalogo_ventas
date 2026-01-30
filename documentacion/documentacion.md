📚 Documentación Técnica: Catálogo Web Plataforma Maybel
1. Visión General del Proyecto
El Catálogo Web Maybel es una aplicación Single Page Application (SPA) diseñada para el mercado cubano. Su función principal es servir como un escaparate digital consultivo para productos físicos (electrodomésticos, vehículos, etc.), facilitando la conexión directa entre el cliente y el vendedor a través de WhatsApp, Telegram o teléfono.
Características Principales:
Modo Consultivo: No existe carrito de compras ni pasarela de pagos.
Multi-moneda: Soporte visual para USD, CUP, EUR, MLC, y más.
Mobile-First: Optimizado para conexiones lentas y dispositivos móviles.
Gestión de Stock: Indicadores visuales de disponibilidad por variantes.
2. Stack Tecnológico
La aplicación ha sido construida utilizando tecnologías modernas, ligeras y performantes:
Core: React 19 (Functional Components + Hooks).
Lenguaje: TypeScript (Tipado estático para robustez).
Estilos: Tailwind CSS (vía CDN para prototipado rápido y bajo peso).
Enrutamiento: React Router DOM v7.
Empaquetado/Build: Vite (inferido por la estructura).
Gestión de Estado: Estado local de React (useState, useEffect, Context API implícito).
3. Arquitectura del Proyecto
El proyecto sigue una estructura modular basada en características y capas de servicio.
📂 Estructura de Directorios
code
Code
/
├── index.html              # Punto de entrada y configuración de Tailwind
├── index.tsx               # Montaje de la aplicación React
├── App.tsx                 # Enrutamiento principal
├── types.ts                # Definiciones de tipos e interfaces (Data Models)
├── constants.ts            # Variables globales (API URL, Contacto, Config)
├── metadata.json           # Metadatos de la aplicación
├── components/             # Componentes de UI reutilizables
│   ├── Navbar.tsx          # Barra de navegación con búsqueda y caché
│   ├── Footer.tsx          # Pie de página informativo
│   ├── ProductCard.tsx     # Tarjeta de producto para grids
│   └── PriceDisplay.tsx    # Componente lógico de precios multi-moneda
├── pages/                  # Vistas principales (Rutas)
│   ├── Home.tsx            # Página de inicio / Landing
│   ├── ProductList.tsx     # Listado (Categorías, Búsqueda, Filtros)
│   └── ProductDetail.tsx   # Vista individual de producto
└── services/               # Lógica de comunicación con Backend
    └── api.ts              # Cliente HTTP y funciones de fetch
4. Detalles de Implementación
4.1. Capa de Datos (Services & Types)
Se implementó un patrón de Service Layer en services/api.ts para desacoplar la lógica de la vista de la lógica de obtención de datos.
Fetch Wrapper: Se creó una función genérica fetchAPI que maneja errores HTTP y parsea respuestas estándar APIResponse<T>.
Endpoints: Se mapearon los endpoints GET requeridos (/categories, /products, etc.).
4.2. Componentes Clave
Navbar.tsx (Navegación y Caché)
Optimización: Implementa un sistema de caché simple usando localStorage. Las categorías se guardan localmente para evitar peticiones redundantes en cada carga, mejorando la velocidad en conexiones lentas.
Búsqueda: Incluye un buscador global que redirige a la vista de resultados.
ProductCard.tsx (Tarjeta de Producto)
Lógica de Stock: Calcula visualmente el estado del stock (Verde: Disponible, Amarillo: Stock Bajo < 5, Rojo: Agotado).
Lazy Loading: Las imágenes utilizan el atributo loading="lazy" nativo.
PriceDisplay.tsx (Gestor de Monedas)
Dado el contexto cubano, este componente es crítico.
Muestra USD y CUP por defecto.
Incluye un botón "Ver otras monedas" que despliega precios en EUR, MLC, Transferencias, etc., si están disponibles en el objeto prices.
4.3. Páginas (Vistas)
Home.tsx
Diseño tipo Landing Page con un Hero Banner.
Carga paralela (Promise.all) de categorías y productos destacados para minimizar el tiempo de carga inicial.
ProductList.tsx
Componente Híbrido: Funciona para 3 casos de uso:
Ver una categoría específica (/categoria/:id).
Ver resultados de búsqueda (/buscar?q=...).
Ver catálogo completo.
Filtrado Cliente: Implementa filtros de lado del cliente para Precio y Disponibilidad sobre los resultados obtenidos.
ProductDetail.tsx
Gestión de Variantes: Permite seleccionar colores (variantes). Al cambiar la variante, se actualiza el stock disponible mostrado.
Galería: Implementa una galería con imagen principal y miniaturas con scroll horizontal.
Integración WhatsApp: Genera dinámicamente un enlace wa.me con un mensaje pre-llenado: "Hola, me interesa el producto: [Nombre] ([Color])...".
5. Decisiones de Diseño y UX (Contexto Cuba)
Sin Carrito de Compras: Se eliminó cualquier flujo de checkout tradicional. Los "Call to Action" (CTA) principales son "Comprar por WhatsApp" y "Consultar por Telegram".
Optimización de Datos: Se evita cargar imágenes de alta resolución innecesariamente (uso de thumbnails donde es posible y lazy loading).
Resiliencia: Manejo robusto de estados de carga (loading) y error (error) en todas las vistas, mostrando esqueletos de carga (skeleton loaders) para mejorar la percepción de velocidad.
Accesibilidad: Uso de colores semánticos para el stock y textos legibles.
6. Configuración Global (constants.ts)
El archivo constants.ts actúa como el centro de configuración del entorno. Aquí se definen:
API_BASE_URL: Dirección del backend.
CONTACT_INFO: Números de teléfono y redes sociales (centralizados para facilitar cambios futuros).
CURRENCY_LABELS: Diccionario para mostrar nombres amigables de las monedas (ej: 'transfer_cup' -> 'Transferencia CUP').
7. Guía de Instalación y Ejecución
Para levantar este proyecto en un entorno de desarrollo local:
Requisitos: Node.js v16+ instalado.
Instalación de dependencias:
code
Bash
npm install
# o
yarn install
Ejecución en desarrollo:
code
Bash
npm run dev
Construcción para producción:
code
Bash
npm run build
Esto generará una carpeta dist/ con los archivos estáticos listos para desplegar en Vercel, Netlify o cualquier servidor web estático.
