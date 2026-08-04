import { frappeMethod, frappeResource, serverConfig } from "./server";

/** Future ERPNext / Frappe integration placeholders. Never commit production credentials. */
export const integrationConfig = {
  erpnextBaseUrl: serverConfig.erpnextUrl,
  frappeApiToken: serverConfig.apiToken,
  websocketUrl: serverConfig.frappeSocketUrl,
  endpoints: {
    customers: frappeResource("Customer"),
    contacts: frappeResource("Contact"),
    reservations: frappeMethod("reservations_calendar"),
    createReservation: frappeMethod("create_reservation"),
    rooms: frappeMethod("room_status_board"),
    tasks: frappeMethod("task_list"),
    createTask: frappeMethod("create_task"),
    assignTask: frappeMethod("assign_task"),
    guestMessages: frappeResource("ADV Guest Message"),
    liftPermissions: frappeMethod("lift_permission_matrix"),
    updateLiftPermission: frappeMethod("update_lift_permission"),
    dashboard: frappeMethod("dashboard"),
    internet: frappeMethod("internet_summary"),
    pos: frappeMethod("pos_summary"),
    hr: frappeMethod("hr_summary"),
    ota: frappeMethod("ota_summary"),
    integrations: frappeMethod("integration_health"),
    invoices: frappeResource("Sales Invoice"),
    payments: frappeResource("Payment Entry"),
    attendance: frappeResource("Attendance"),
    assets: frappeResource("Asset"),
    uploads: `${serverConfig.erpnextUrl.replace(/\/$/, "")}/api/method/upload_file`,
  },
} as const;
