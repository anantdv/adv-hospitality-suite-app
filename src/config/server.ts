export const serverConfig = {
  erpnextUrl: import.meta.env.VITE_ERPNEXT_URL || "https://erpnext.example.com",
  frappeSocketUrl: import.meta.env.VITE_FRAPPE_SOCKET_URL || "wss://erpnext.example.com/socket.io",
  apiToken: import.meta.env.VITE_FRAPPE_API_TOKEN || "",
  appNamespace: "adv_hospitality_backend",
} as const;

export const frappeMethod = (method: string) =>
  `${serverConfig.erpnextUrl.replace(/\/$/, "")}/api/method/${serverConfig.appNamespace}.api.${method}`;

export const frappeResource = (doctype: string) =>
  `${serverConfig.erpnextUrl.replace(/\/$/, "")}/api/resource/${encodeURIComponent(doctype)}`;

