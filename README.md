# ADV Hospitality Suite

Presentation-ready React prototype for a unified hotel operations, guest experience, security and business management platform.

## Run locally

```bash
npm install
npm run dev
```

Build a production preview with `npm run build` and `npm run preview`.

## Technology

React, TypeScript, Vite, React Router foundation, TanStack Query, Zustand, Recharts, React Hook Form/Zod-ready dependencies, Lucide React and date-fns. The UI uses a custom responsive design system with a premium navy, blue, teal and gold hospitality palette.

## Prototype capabilities

- Executive and live operations dashboards with simulated live counters
- Searchable reservations and a guided Sarah Williams check-in workflow
- Room status board with contextual details
- Tacitine-compatible hotspot dashboard and internet activation wizard
- Access control, guest credential, emergency state and editable lift matrix
- Interactive restaurant POS, workforce attendance, OTA and integration health views
- Role, property, theme and presentation-mode state persisted in local storage
- Command-search shortcut: `Cmd/Ctrl + K`

## Presentation flow

Executive Dashboard → Reservations → Guest Check-In → Internet Management → Access Control → Lift Access → Rooms → Restaurant POS → HR & Attendance → OTA & Channels → Integration Health.

Use **Enter presentation mode** from the floating presenter control to remove the sidebar and increase visual spacing. The central guest story is Sarah Williams, reservation `ADV-RES-2026-00842`, Room 508, VIP, Booking.com.

## Mock data and API layer

`src/mock/data.ts` holds deterministic presentation data. `src/api/mockApi.ts` returns typed, delayed promises and includes a controlled error pathway. Expand API modules by domain (`reservationsApi`, `roomsApi`, `hotspotApi`, and so on) as real integrations are introduced.

## ERPNext readiness

`src/config/server.ts` and `src/config/integration.ts` contain non-secret placeholders for ERPNext/Frappe base URL, WebSocket URL and representative endpoints. Configure deployments with:

```bash
VITE_ERPNEXT_URL=https://your-erpnext-site.example.com
VITE_FRAPPE_SOCKET_URL=wss://your-erpnext-site.example.com/socket.io
VITE_FRAPPE_API_TOKEN=
```

The companion Frappe app is included at `frappe/adv_hospitality_backend`. Install it in an ERPNext bench with:

```bash
bench get-app ./frappe/adv_hospitality_backend
bench --site your-site.local install-app adv_hospitality_backend
bench --site your-site.local migrate
```

It creates DocTypes for property, rooms, room types, guests, reservations, stays, guest messages, operations tasks, housekeeping, maintenance, Tacitine-style hotspot/network records, access events, guest credentials, lift permissions, POS outlets/orders, staff rosters, OTA channels and integration events. Whitelisted methods are exposed under `adv_hospitality_backend.api`.

Replace the mock API layer with authenticated Frappe REST/custom whitelisted calls, CSRF/session handling and secure token storage. No real credentials are included.

## Prototype limitations

The application intentionally uses mock data, local interactions and simulated API calls only. Device, payment, hotspot, OTA, biometric, lift and ERPNext integrations are presentation simulations—not live production integrations.
