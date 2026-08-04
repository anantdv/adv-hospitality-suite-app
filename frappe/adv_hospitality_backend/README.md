# ADV Hospitality Backend

Frappe/ERPNext companion app for the ADV Hospitality Suite React frontend.

## Install in a bench

```bash
bench get-app ./frappe/adv_hospitality_backend
bench --site your-site.local install-app adv_hospitality_backend
bench --site your-site.local migrate
```

The install hook creates the hospitality DocTypes and seeds starter property, room, OTA, outlet and lift permission data.

## Main DocTypes

- `ADV Property`, `ADV Room Type`, `ADV Room`
- `ADV Guest`, `ADV Reservation`, `ADV Guest Stay`, `ADV Guest Message`
- `ADV Operation Task`, `ADV Housekeeping Inspection`, `ADV Maintenance Event`
- `ADV Hotspot Session`, `ADV Network Flow`
- `ADV Access Event`, `ADV Guest Credential`, `ADV Lift Permission`
- `ADV POS Outlet`, `ADV POS Order`
- `ADV Staff Roster`, `ADV OTA Channel`, `ADV Integration Event`

## API methods

Whitelisted methods live in `adv_hospitality_backend.api` and expose dashboard, reservation calendar, room board, task, lift permission and module summary endpoints for the React app.

