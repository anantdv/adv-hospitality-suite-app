/** Future ERPNext / Frappe integration placeholders. Never commit production credentials. */
export const integrationConfig={
  erpnextBaseUrl:'https://erpnext.example.com',frappeApiToken:'REPLACE_AT_DEPLOYMENT',websocketUrl:'wss://erpnext.example.com/socket.io',
  endpoints:{customers:'/api/resource/Customer',contacts:'/api/resource/Contact',reservations:'/api/method/adv_hospitality.reservations',rooms:'/api/resource/Hotel Room',invoices:'/api/resource/Sales Invoice',payments:'/api/resource/Payment Entry',attendance:'/api/resource/Attendance',assets:'/api/resource/Asset',uploads:'/api/method/upload_file'}
} as const;
