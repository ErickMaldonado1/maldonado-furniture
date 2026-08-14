# Muebles Maldonado — E-Commerce Platform

Plataforma e-commerce full-stack de alta performance para la venta de muebles a medida, construida con Next.js 16, TypeScript y MongoDB. Orientada a SEO, velocidad y escalabilidad.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16.3 (App Router) |
| Lenguaje | TypeScript 6 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion 13 |
| ORM | Prisma 6.9 + MongoDB Atlas |
| Autenticación | NextAuth.js v4 (Credentials + Google) |
| Almacenamiento | Cloudinary |
| Estado Global | Zustand 5 |
| Formularios | React Hook Form + Zod |
| Email | Resend |
| Deploy | Vercel |

---

## Funcionalidades

### Tienda (Shop)
- Catálogo dinámico con rutas anidadas `/{categoria}/{subcategoría}/{slug}`
- Filtros avanzados por color, material, estilo y rango de precio
- Buscador en tiempo real con query params (`/productos?q=...`)
- Vista de detalle de producto con galería de imágenes y selector de variantes
- Carrito de compras persistente (Zustand + localStorage)
- Lista de favoritos con sincronización a base de datos
- Productos relacionados y vistos recientemente

### Checkout y Órdenes
- Flujo de checkout con formulario de datos de envío
- Historial de órdenes por usuario
- Gestión de estados de orden: `PENDING`, `PAID`, `COMPLETED`, `CANCELLED`

### Autenticación y Perfiles
- Registro con email/contraseña (bcrypt) y número de teléfono
- Login con Google OAuth
- Perfil de usuario editable
- Roles: `USER` y `ADMIN`

### Panel de Administración (`/admin`)
- Gestión CRUD completa de productos y variantes
- Gestión de órdenes con cambio de estado
- Gestión de usuarios y roles
- Catálogo de colores por proveedor (PELIKANO, EDIMCA, MASISA)
- Upload de imágenes a Cloudinary

### SEO y Rendimiento
- `sitemap.xml` dinámico generado desde la base de datos (revalidado cada 24h)
- `robots.txt` configurable
- Metadata y Open Graph por página y por producto
- URLs indexadas con slugs únicos almacenados en base de datos
- Optimización de imágenes Cloudinary con transformaciones automáticas (`f_auto,q_auto`)
- Bundle Analyzer incluido (`npm run analyze`)

---

## Estructura del Proyecto

```
maldonado-furniture/
├── prisma/
│   └── schema.prisma           # Modelos: User, Product, Order, Color, Favorite...
├── public/                     # Assets estáticos
└── src/
    ├── app/
    │   ├── (admin)/admin/      # Panel de administración
    │   ├── (auth)/             # Login, Register, Profile
    │   ├── (public)/           # Contacto, Proyectos, Servicios, FAQ
    │   ├── (shop)/             # Tienda: Home, Categorías, Producto, Carrito, Checkout
    │   ├── api/                # API Routes (REST)
    │   ├── sitemap.ts          # Sitemap dinámico
    │   └── robots.ts           # robots.txt
    ├── components/
    │   ├── admin/              # ProductForm, AdminSidebar
    │   ├── home/               # HeroSlider, FeaturedCarousel, CategoryCarousel...
    │   ├── layout/             # NavBar, Footer, Menus, Drawers
    │   ├── shop/               # ProductCard, Filters, ProductDetail, ProductGallery...
    │   └── ui/                 # Breadcrumbs, Drawer, WhatsApp, ColorModal...
    ├── features/
    │   ├── admin/              # product.actions, color.actions, product.schema
    │   ├── auth/               # auth.options, auth.service, LoginForm, RegisterForm
    │   ├── contact/            # actions
    │   ├── orders/             # order.actions, order.service
    │   ├── products/           # product.service
    │   ├── shop/               # shop.actions
    │   └── users/              # user.service
    ├── hooks/                  # useProductFilters, useRecentlyViewed, useSessionTimeout
    ├── lib/                    # prisma, cloudinary, contact-validation
    ├── providers/              # AuthProvider, ThemeProvider, MainProvider, ClientUI
    ├── store/                  # cart-store, favorites-store (Zustand)
    ├── styles/                 # globals.css (Tailwind v4)
    ├── types/                  # product-service.ts, next-auth.d.ts
    └── utils/                  # slugify, categories, icons, SlidesHero, proyectos...
```

---

## Variables de Entorno

Crea un archivo `.env` en la raíz con las siguientes variables:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
```

---

## Comandos

```bash
npm run dev          # Servidor de desarrollo (Turbopack)
npm run build        # Genera Prisma Client + build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
npm run format       # Prettier (write)
npm run format:check # Prettier (check)
npm run analyze      # Bundle Analyzer (ANALYZE=true)
npx prisma generate  # Regenerar Prisma Client tras cambios en schema
```

---

## Modelos de Base de Datos

| Modelo | Descripción |
|---|---|
| `User` | Usuarios con roles (USER / ADMIN) |
| `Product` | Productos con slug único, categoría, precios y variantes |
| `ProductVariant` | Variantes por color/material con dimensiones |
| `ProductImage` | Imágenes alojadas en Cloudinary |
| `Order` | Órdenes de compra con estado y datos de envío |
| `OrderItem` | Ítems individuales por orden |
| `Favorite` | Favoritos por usuario y variante |
| `Color` | Catálogo de colores por proveedor |
| `Newsletter` | Suscriptores al boletín |

---

## Deploy

El proyecto está optimizado para deploy en **Vercel**. Asegúrate de configurar todas las variables de entorno en el panel de Vercel antes del deploy.

Sitemap disponible en: `https://www.mueblesmaldonadoec.com/sitemap.xml`

