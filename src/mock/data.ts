export type Status = 'healthy' | 'warning' | 'critical' | 'offline';

export const properties = ['Harbour View Hotel', 'Coral Coast Resort', 'Highlands Lodge'];
export const roles = [
  'General Manager',
  'Front Desk Manager',
  'Receptionist',
  'Housekeeping Supervisor',
  'Security Manager',
  'HR Manager',
  'Restaurant Manager',
  'Finance Manager',
  'System Administrator',
];

export const reservations = [
  { id: 'ADV-RES-2026-00842', guest: 'Sarah Williams', room: '508', type: 'Executive King', arrival: 'Today, 14:00', departure: '16 Aug 2026', nights: 3, source: 'Booking.com', status: 'Confirmed', payment: 'Guaranteed', amount: 'PGK 2,760', vip: true },
  { id: 'ADV-RES-2026-00851', guest: 'Daniel Kila', room: '324', type: 'Deluxe Twin', arrival: 'Today, 15:30', departure: '14 Aug 2026', nights: 1, source: 'Direct Website', status: 'Checked in', payment: 'Paid', amount: 'PGK 920', vip: false },
  { id: 'ADV-RES-2026-00836', guest: 'Mei Zhang', room: '611', type: 'Premier Suite', arrival: 'Tomorrow, 12:00', departure: '18 Aug 2026', nights: 4, source: 'Expedia', status: 'Confirmed', payment: 'Deposit', amount: 'PGK 5,360', vip: true },
  { id: 'ADV-RES-2026-00818', guest: 'Peter Siale', room: '217', type: 'Superior King', arrival: 'Today, 13:00', departure: '15 Aug 2026', nights: 2, source: 'Corporate', status: 'Tentative', payment: 'Pending', amount: 'PGK 1,520', vip: false },
  { id: 'ADV-RES-2026-00863', guest: 'Ari Namoa', room: '420', type: 'Family Suite', arrival: 'Today, 17:20', departure: '17 Aug 2026', nights: 4, source: 'Agoda', status: 'Confirmed', payment: 'Card auth', amount: 'PGK 3,840', vip: false },
  { id: 'ADV-RES-2026-00871', guest: 'Linda Morea', room: '621', type: 'Ocean Suite', arrival: 'Tomorrow, 09:40', departure: '19 Aug 2026', nights: 5, source: 'Direct Website', status: 'Confirmed', payment: 'Deposit', amount: 'PGK 6,800', vip: true },
  { id: 'ADV-RES-2026-00877', guest: 'Mark Taylor', room: '415', type: 'Deluxe King', arrival: '12 Aug, 11:10', departure: '14 Aug 2026', nights: 2, source: 'Trip.com', status: 'Confirmed', payment: 'Guaranteed', amount: 'PGK 1,680', vip: false },
  { id: 'ADV-RES-2026-00882', guest: 'Jasmine Kora', room: '212', type: 'Superior Twin', arrival: '12 Aug, 16:00', departure: '15 Aug 2026', nights: 3, source: 'Corporate', status: 'Tentative', payment: 'Pending', amount: 'PGK 2,160', vip: false },
];

export const reservationCalendar = [
  { id: 'CAL-001', title: 'Sarah Williams arrival', time: '09:00', room: '508', type: 'VIP arrival', status: 'gold', detail: 'Airport transfer lands at 13:20. Room inspection due before 12:30.' },
  { id: 'CAL-002', title: 'Corporate group check-in', time: '10:00', room: '214-226', type: 'Group', status: 'blue', detail: '18 rooms from Morobe Mining. Pre-key cards and WiFi vouchers required.' },
  { id: 'CAL-003', title: 'Ballroom setup', time: '11:00', room: 'Ballroom', type: 'Event', status: 'warning', detail: 'Conference layout, 120 delegates, dedicated bandwidth policy.' },
  { id: 'CAL-004', title: 'Mei Zhang pre-arrival', time: '12:00', room: '611', type: 'VIP prep', status: 'gold', detail: 'Suite amenities, late checkout approval, executive lift entitlement.' },
  { id: 'CAL-005', title: 'Housekeeping inspection', time: '13:00', room: '512, 517, 621', type: 'Inspection', status: 'healthy', detail: 'Supervisor sign-off for priority arrival rooms.' },
  { id: 'CAL-006', title: 'OTA import review', time: '14:00', room: 'Front desk', type: 'System', status: 'warning', detail: 'Three channel reservations need rate-plan mapping before night audit.' },
];

export const trend = [
  { day: 'Mon', occupancy: 71, revenue: 42000, internet: 830, checkins: 34 },
  { day: 'Tue', occupancy: 73, revenue: 46900, internet: 910, checkins: 41 },
  { day: 'Wed', occupancy: 76, revenue: 52100, internet: 1050, checkins: 46 },
  { day: 'Thu', occupancy: 75, revenue: 50300, internet: 980, checkins: 43 },
  { day: 'Fri', occupancy: 79, revenue: 58600, internet: 1140, checkins: 48 },
  { day: 'Sat', occupancy: 82, revenue: 64200, internet: 1260, checkins: 56 },
  { day: 'Sun', occupancy: 79, revenue: 57700, internet: 1180, checkins: 49 },
];

export const rooms = [
  { room: '508', status: 'Occupied', priority: 'VIP', guest: 'Sarah Williams', type: 'Executive King', stay: '14 Aug - 16 Aug', housekeeping: 'Turn-down at 18:00', maintenance: 'No open work orders', minibar: 'Pending audit', internet: 'Premium active', balance: 'PGK 600 deposit' },
  { room: '509', status: 'Service due', priority: 'Priority', guest: '', type: 'Deluxe King', stay: 'Vacant', housekeeping: 'Deep clean scheduled 15:20', maintenance: 'AC filter inspection', minibar: 'Restock water', internet: 'Inactive', balance: 'None' },
  { room: '510', status: 'Vacant clean', priority: 'Ready', guest: '', type: 'Deluxe Twin', stay: 'Next arrival tomorrow', housekeeping: 'Cleaned 08:40 by Mila', maintenance: 'No open work orders', minibar: 'Sealed', internet: 'Inactive', balance: 'None' },
  { room: '511', status: 'Maintenance', priority: 'Blocked', guest: '', type: 'Superior King', stay: 'Out of order', housekeeping: 'On hold', maintenance: 'Fan coil leak - Engineering ETA 14:30', minibar: 'Locked', internet: 'Inactive', balance: 'None' },
  { room: '512', status: 'Reserved', priority: 'Arrival 15:00', guest: 'Ari Namoa', type: 'Family Suite', stay: '15 Aug - 17 Aug', housekeeping: 'Final inspection 13:00', maintenance: 'TV remote battery replaced', minibar: 'Family pack ready', internet: 'Pre-authorized', balance: 'Card auth PGK 400' },
  { room: '513', status: 'Vacant dirty', priority: 'Housekeeping', guest: '', type: 'Superior Twin', stay: 'Departed 09:10', housekeeping: 'Cleaning assigned to Joseph, due 11:45', maintenance: 'Shower pressure check requested', minibar: 'Needs audit', internet: 'Inactive', balance: 'Closed' },
  { room: '514', status: 'Occupied', priority: 'DND', guest: 'Daniel Kila', type: 'Deluxe Twin', stay: '11 Aug - 14 Aug', housekeeping: 'Do not disturb until 16:00', maintenance: 'No open work orders', minibar: 'Posted PGK 42', internet: 'Standard active', balance: 'Paid' },
  { room: '515', status: 'Inspection', priority: 'Supervisor', guest: '', type: 'Superior King', stay: 'Arrival 16:30', housekeeping: 'Supervisor sign-off pending', maintenance: 'No open work orders', minibar: 'Sealed', internet: 'Voucher staged', balance: 'None' },
  { room: '516', status: 'Vacant clean', priority: 'Ready', guest: '', type: 'Deluxe King', stay: 'Standby upgrade room', housekeeping: 'Cleaned 07:55 by Lina', maintenance: 'Lamp repaired', minibar: 'Sealed', internet: 'Inactive', balance: 'None' },
  { room: '517', status: 'Reserved', priority: 'VIP arrival', guest: 'Mei Zhang', type: 'Premier Suite', stay: '12 Aug - 18 Aug', housekeeping: 'Amenities in progress', maintenance: 'Spa bath tested', minibar: 'Premium stocked', internet: 'VIP unlimited staged', balance: 'Deposit received' },
  { room: '518', status: 'Occupied', priority: 'Late checkout', guest: 'Samuel Oa', type: 'Executive King', stay: '10 Aug - 14 Aug', housekeeping: 'Service after 13:00', maintenance: 'Safe battery low', minibar: 'Posted PGK 68', internet: 'Premium active', balance: 'Corporate charge' },
  { room: '519', status: 'Vacant dirty', priority: 'Rush clean', guest: '', type: 'Deluxe King', stay: 'Arrival 14:30', housekeeping: 'Rush clean, due 12:20', maintenance: 'No open work orders', minibar: 'Needs restock', internet: 'Voucher staged', balance: 'None' },
  { room: '520', status: 'Vacant clean', priority: 'Ready', guest: '', type: 'Twin Accessible', stay: 'No arrival', housekeeping: 'Cleaned 08:18', maintenance: 'Grab rail inspected', minibar: 'Sealed', internet: 'Inactive', balance: 'None' },
  { room: '521', status: 'Occupied', priority: 'Family', guest: 'Linda Morea', type: 'Family Suite', stay: '09 Aug - 15 Aug', housekeeping: 'Extra towels requested', maintenance: 'No open work orders', minibar: 'Posted PGK 30', internet: 'Family package active', balance: 'PGK 320 open' },
  { room: '522', status: 'Inspection', priority: 'QA review', guest: '', type: 'Ocean Suite', stay: 'VIP arrival tomorrow', housekeeping: 'Supervisor QA at 14:00', maintenance: 'Balcony door calibrated', minibar: 'Premium stocked', internet: 'VIP staged', balance: 'None' },
];

export const securityEvents = [
  ['08:42', 'Guest accessed Room 508', 'Granted', 'Room 508'],
  ['08:37', 'Staff entered Kitchen', 'Granted', 'Kitchen'],
  ['08:29', 'Access denied at Server Room', 'Denied', 'Server Room'],
  ['08:18', 'Lift access granted to Floor 5', 'Granted', 'Lift A'],
  ['08:04', 'Door held open at Loading Bay', 'Alert', 'Loading Bay'],
];

export const sessions = [
  ['Sarah Williams', '508', 'iPhone 15', 'Premium Guest', '1.8 GB', '02:14', 'Active'],
  ['Daniel Kila', '324', 'MacBook Air', 'Standard Guest', '790 MB', '04:51', 'Active'],
  ['Conference Delegate', 'Ballroom', 'Samsung S24', 'Conference Premium', '2.3 GB', '01:16', 'Active'],
  ['Lina Morea', '621', 'iPad Pro', 'VIP Unlimited', '4.8 GB', '06:22', 'Active'],
  ['Ari Namoa', '512', 'Pixel 10', 'Family Guest', '620 MB', '00:42', 'Active'],
  ['Staff Device', 'Back office', 'Windows laptop', 'Staff', '3.1 GB', '07:10', 'Active'],
];

export const tacitineServices = [
  ['Network Link Manager', 'Enabled', 'Running', 'WAN/LAN link state and failover'],
  ['DHCP Server', 'Enabled', 'Running', 'Guest lease allocation'],
  ['DNS Resolver', 'Enabled', 'Running', 'Local DNS cache and filtering'],
  ['HotSpot Server', 'Enabled', 'Running', 'Captive portal and authentication'],
  ['HotSpot Accounting Server', 'Enabled', 'Running', 'Usage accounting and billing export'],
  ['HotSpot Auto Login Server', 'Enabled', 'Running', 'Room-number/surname auto login'],
  ['Firewall', 'Enabled', 'Running', 'Guest isolation and blocked application rules'],
  ['Syslog Daemon', 'Enabled', 'Running', 'Audit trail export'],
  ['Command Scheduler', 'Enabled', 'Running', 'ERPNext policy sync schedule'],
];

export const netFlows = [
  ['192.168.100.127', '27.123.137.73', 'udp', '63378', '6.4 MB', '2', '2.04 MB', '4.35 MB'],
  ['192.168.100.127', '173.194.28.129', 'udp', '443/HTTPS', '3.45 MB', '1', '3.39 MB', '59.4 KB'],
  ['192.168.100.127', '157.240.8.128', 'udp', 'Skype/Zoom/MSTeam', '909.52 KB', '1', '49.05 KB', '860.47 KB'],
  ['192.168.100.127', '172.217.115.4', 'udp', '443/HTTPS', '845.76 KB', '2', '463.72 KB', '382.05 KB'],
  ['192.168.100.149', '142.250.183.35', 'tcp', '443/HTTPS', '480.59 KB', '1', '33.76 KB', '446.84 KB'],
  ['192.168.100.120', '74.125.130.188', 'tcp', '5228/Google-GCM', '54.65 KB', '1', '49.33 KB', '5.34 KB'],
];

export const integrations = [
  ['ERPNext Core', 'healthy', '08:46', '12ms'],
  ['Tacitine Hotspot', 'healthy', '08:46', '28ms'],
  ['Door Access Controllers', 'healthy', '08:45', '19ms'],
  ['Lift Controllers', 'warning', '08:41', '93ms'],
  ['Biometric Devices', 'healthy', '08:46', '21ms'],
  ['OTA Channel Manager', 'warning', '08:39', '134ms'],
  ['Payment Gateway', 'healthy', '08:46', '62ms'],
  ['IoT Gateway', 'offline', '08:12', '-'],
];

export const notifications = [
  ['critical', 'Door controller offline', 'Service Floor Controller 02 has not responded for 6 minutes.'],
  ['warning', 'OTA import requires mapping', 'Booking.com rate plan needs confirmation for Sarah Williams.'],
  ['warning', 'Room 508 is not ready', 'Housekeeping inspection is pending before guest arrival.'],
  ['healthy', 'VIP arriving in 30 minutes', 'Sarah Williams will arrive via airport transfer.'],
  ['warning', 'Gateway usage reached 80%', 'Tacitine gateway bandwidth threshold was reached.'],
];
