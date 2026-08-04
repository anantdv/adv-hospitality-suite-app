import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Command,
  DoorOpen,
  Hotel,
  KeyRound,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessageSquareWarning,
  MonitorPlay,
  Moon,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Signal,
  SlidersHorizontal,
  Sun,
  Users,
  UtensilsCrossed,
  Wifi,
  Wrench,
  X,
} from 'lucide-react';
import { api } from './api/mockApi';
import {
  integrations,
  hotelTasks,
  netFlows,
  properties,
  reservationCalendar,
  reservations,
  roles,
  rooms,
  securityEvents,
  tacitineServices,
  trend,
} from './mock/data';
import { useDemoStore } from './stores/demoStore';

type Page =
  | 'dashboard'
  | 'operations'
  | 'reservations'
  | 'checkin'
  | 'rooms'
  | 'tasks'
  | 'hotspot'
  | 'access'
  | 'lift'
  | 'pos'
  | 'hr'
  | 'ota'
  | 'integrations';

type Toast = { title: string; body: string };
type CalEvent = (typeof reservationCalendar)[number];
type Room = (typeof rooms)[number];

const nav: { group: string; items: [Page, string, typeof LayoutDashboard][] }[] = [
  { group: 'Overview', items: [['dashboard', 'Executive Dashboard', LayoutDashboard], ['operations', 'Live Operations Centre', MonitorPlay]] },
  { group: 'Hotel Operations', items: [['reservations', 'Reservations', CalendarDays], ['checkin', 'Guest Check-In', KeyRound], ['rooms', 'Rooms & Housekeeping', Hotel], ['tasks', 'Tasks', ClipboardList]] },
  { group: 'Guest & Security', items: [['hotspot', 'Internet Management', Wifi], ['access', 'Access Control', ShieldCheck], ['lift', 'Lift Access', DoorOpen]] },
  { group: 'Business Management', items: [['pos', 'POS & Outlets', UtensilsCrossed], ['hr', 'HR & Attendance', Users], ['ota', 'OTA & Channels', RefreshCw], ['integrations', 'Integration Health', SlidersHorizontal]] },
];

const navTone: Record<Page, string> = {
  dashboard: '#38bdf8',
  operations: '#22c55e',
  reservations: '#f59e0b',
  checkin: '#14b8a6',
  rooms: '#6366f1',
  tasks: '#eab308',
  hotspot: '#06b6d4',
  access: '#ef4444',
  lift: '#8b5cf6',
  pos: '#f97316',
  hr: '#10b981',
  ota: '#3b82f6',
  integrations: '#94a3b8',
};

function Badge({ children, tone = 'healthy' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge ${tone.toLowerCase().replace(/\s+/g, '-')}`}>{children}</span>;
}

function Stat({ label, value, trend: line = 'vs yesterday', tone = 'blue', onClick }: { label: string; value: string | number; trend?: string; tone?: string; onClick?: () => void }) {
  return (
    <button className={`stat ${tone}`} onClick={onClick}>
      <span>{label}</span>
      <b>{value}</b>
      <small><ArrowUpRight size={13} /> {line}</small>
    </button>
  );
}

function Header({ page, setSearch, toggleMobileNav }: { page: string; setSearch: (v: boolean) => void; toggleMobileNav: () => void }) {
  const store = useDemoStore();
  return (
    <header className="topbar">
      <div className="crumb-wrap">
        <button className="mobile-menu" onClick={toggleMobileNav} aria-label="Open navigation"><Menu /></button>
        <div className="crumb">Overview <ChevronRight size={14} /> <b>{page}</b></div>
      </div>
      <div className="top-actions">
        <button className="search-btn" onClick={() => setSearch(true)}>
          <Search size={16} />
          <span>Search guests, reservations and more</span>
          <kbd>Cmd K</kbd>
        </button>
        <select value={store.property} onChange={(e) => store.set({ property: e.target.value })} aria-label="Property switcher">
          {properties.map((x) => <option key={x}>{x}</option>)}
        </select>
        <button className="icon-btn" onClick={() => store.set({ dark: !store.dark })}>{store.dark ? <Sun /> : <Moon />}</button>
        <button className="icon-btn notify"><Bell /><i>5</i></button>
        <button className="avatar">GM</button>
      </div>
    </header>
  );
}

function Activity({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <article className="panel list-panel">
      <div className="panel-head"><h3>{title}</h3><button className="text-btn">View all</button></div>
      {rows.map((r) => (
        <div className="activity" key={`${title}-${r[0]}`}>
          <div className="avatar mini">{r[0].slice(0, 1)}</div>
          <div><b>{r[0]}</b><span>{r[1]}</span></div>
          <Badge tone={r[2]}>{r[2]}</Badge>
        </div>
      ))}
    </article>
  );
}

function Dashboard({ go }: { go: (p: Page) => void }) {
  const store = useDemoStore();
  return (
    <>
      <section className="page-head">
        <div>
          <div className="eyebrow"><span className="live-dot" /> LIVE OPERATIONS - Tuesday, 11 August 2026</div>
          <h1>Good morning, {store.role.split(' ')[0]}.</h1>
          <p>{store.property} is operating smoothly, with a few items needing attention.</p>
        </div>
        <div className="head-actions">
          <button className="secondary"><CalendarDays size={17} /> Operational date</button>
          <button className="primary" onClick={() => go('checkin')}><Plus size={17} /> Check in guest</button>
        </div>
      </section>
      <section className="hero-card">
        <div>
          <Badge tone="gold">Harbour View Hotel - Live</Badge>
          <h2>78.6% occupancy - a strong Tuesday ahead.</h2>
          <p>Revenue is tracking 8.2% above last week. Two VIP arrivals, three OTA mapping tasks and one Tacitine gateway exception require attention.</p>
          <button onClick={() => go('operations')}>Open operations centre <ChevronRight size={16} /></button>
        </div>
        <div className="hero-arc"><strong>78.6<span>%</span></strong><small>Occupancy</small></div>
      </section>
      <div className="stat-grid">
        <Stat label="Rooms occupied" value="118 / 150" trend="+4 rooms vs yesterday" onClick={() => go('rooms')} />
        <Stat label="Arrivals today" value="48" trend="12 early check-ins" tone="teal" onClick={() => go('reservations')} />
        <Stat label="Departures today" value="41" trend="8 still to settle" tone="gold" />
        <Stat label="Revenue today" value="PGK 58.6k" trend="+8.2% vs last Tuesday" />
        <Stat label="Active WiFi sessions" value="1,246" trend="98.7% authentication success" tone="teal" onClick={() => go('hotspot')} />
        <Stat label="Door access events" value="4,818" trend="3 require review" tone="gold" onClick={() => go('access')} />
        <Stat label="Staff present" value="286" trend="12 late arrivals" onClick={() => go('hr')} />
        <Stat label="Open maintenance" value="9" trend="1 critical SLA" tone="red" />
      </div>
      <section className="two-col charts">
        <article className="panel">
          <div className="panel-head"><div><h3>Occupancy & revenue trend</h3><p>Seven-day performance</p></div><button className="text-btn">View analytics</button></div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trend}>
              <defs><linearGradient id="occ" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#0f9d8a" stopOpacity=".35" /><stop offset="1" stopColor="#0f9d8a" stopOpacity="0" /></linearGradient></defs>
              <XAxis dataKey="day" /><YAxis /><Tooltip />
              <Area dataKey="occupancy" stroke="#0f9d8a" strokeWidth={3} fill="url(#occ)" />
              <Line dataKey="revenue" stroke="#1d4ed8" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h3>Revenue by department</h3><p>Today's posted revenue</p></div><Badge>PGK 58.6k</Badge></div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[{ n: 'Rooms', v: 34100 }, { n: 'Restaurant', v: 12400 }, { n: 'Bar', v: 6100 }, { n: 'Spa', v: 3400 }, { n: 'Internet', v: 2600 }]}>
              <XAxis dataKey="n" /><Tooltip /><Bar dataKey="v" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
      <section className="three-col">
        <Activity title="VIP arrivals" rows={[['Sarah Williams', 'Room 508 - Booking.com', 'gold'], ['Mei Zhang', 'Room 517 - Expedia', 'gold'], ['Linda Morea', 'Room 621 - Direct', 'gold']]} />
        <Activity title="Operational risks" rows={[['Room 511', 'Maintenance block - fan coil leak', 'critical'], ['Tacitine WAN', 'Bandwidth reached 80%', 'warning'], ['OTA mapping', '3 reservations need review', 'warning']]} />
        <Activity title="Future integration queue" rows={[['ERPNext Core', 'Reservation, POS and HR sync ready', 'healthy'], ['Door controllers', 'Credential event bridge staged', 'healthy'], ['Tacitine HS5200', 'Hotspot accounting export active', 'healthy']]} />
      </section>
      <RevenueIntelligence />
      <FeatureIdeas />
    </>
  );
}

function RevenueIntelligence() {
  const bars = [
    { label: 'OTB vs.', value: 118, base: 112, change: '+5.4%' },
    { label: 'Month forecast vs. LY', value: 120, base: 114, change: '+5.2%' },
  ];
  const revenueBars = [
    { label: 'OTB vs.', value: 290172, base: 274821, change: '+5.6%' },
    { label: 'Month forecast vs. LY', value: 292258, base: 280435, change: '+4.5%' },
  ];
  return (
    <section className="revenue-intel">
      <div className="revenue-title"><button className="icon-btn"><ChevronRight className="flip" /></button><h2>July 2025 revenue intelligence - PGK Kina</h2><button className="icon-btn"><ChevronRight /></button></div>
      <article className="panel revenue-card">
        <div className="metric-head"><h3>RevPAR</h3><b>PGK 118</b></div>
        {bars.map((x, i) => <BenchmarkBar key={x.label} {...x} max={140} accent={i ? 'slate' : 'pink'} />)}
      </article>
      <article className="panel revenue-card occupancy-card">
        <div className="metric-head"><h3>Occupancy</h3><b>55%</b></div>
        <div className="donut-pair">
          <div><div className="mini-donut pink"><b>55%</b></div><span>Current OTB</span><small>Same time LY <b>52%</b> +5.4</small></div>
          <div><div className="mini-donut slate"><b>82%</b></div><span>Month forecast</span><small>End of month LY <b>76%</b> +7.9</small></div>
        </div>
      </article>
      <article className="panel spark-card">
        <div className="metric-head"><h3>Room nights</h3><b>4,214</b></div>
        <ResponsiveContainer width="100%" height={160}><LineChart data={trend.concat(trend)}><Tooltip /><Line dataKey="occupancy" stroke="#ec6fc2" strokeWidth={3} dot={false} /><Bar dataKey="checkins" fill="#eef1f4" /></LineChart></ResponsiveContainer>
      </article>
      <article className="panel revenue-card">
        <div className="metric-head"><h3>Revenue</h3><b>PGK 290,172</b></div>
        {revenueBars.map((x, i) => <BenchmarkBar key={x.label} {...x} max={320000} accent={i ? 'slate' : 'pink'} />)}
      </article>
      <article className="panel spark-card">
        <div className="metric-head"><h3>ADR</h3><b>PGK 177</b></div>
        <span className="metric-note">STLY: 174 +1.7</span>
        <ResponsiveContainer width="100%" height={185}><LineChart data={trend.concat(trend).map((x, i) => ({ ...x, adr: 165 + ((i * 17) % 34) }))}><Tooltip /><Bar dataKey="revenue" fill="#f0f1f4" /><Line dataKey="adr" stroke="#ec6fc2" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer>
      </article>
      <article className="panel comp-card">
        <div className="metric-head"><h3>Competitor pricing</h3><b>BAR</b></div>
        {['Your best price - PGK 177', 'Hotel Portinari - PGK 184', 'River Haven - PGK 169', 'Coral Tower - PGK 191'].map((x, i) => <div className={i === 0 ? 'best' : ''} key={x}>{x}</div>)}
      </article>
    </section>
  );
}

function BenchmarkBar({ label, value, base, change, max, accent }: { label: string; value: number; base: number; change: string; max: number; accent: string }) {
  const format = (n: number) => n > 1000 ? n.toLocaleString() : n;
  return (
    <div className="benchmark">
      <div><span>{label}</span><b>{change}</b></div>
      <i className={accent} style={{ width: `${Math.min(100, (value / max) * 100)}%` }}><em>{format(value)}</em></i>
      <i className="baseline" style={{ width: `${Math.min(100, (base / max) * 100)}%` }}><em>{format(base)}</em></i>
    </div>
  );
}

function FeatureIdeas() {
  const items: [typeof CalendarDays, string, string, string][] = [
    [CalendarDays, 'Drag-and-drop PMS calendar', 'Room, group, event and housekeeping actions in a unified calendar with smart filters and live collaboration.', 'Cloudbeds-style operations hub'],
    [Users, 'Unified guest profile', 'Merged guest history, notes, preferences, lifetime value, loyalty and stay context for every department.', 'Personalized service layer'],
    [ArrowUpRight, 'Revenue intelligence', 'Dynamic rate recommendations, parity warnings, pickup pace, RevPAR lift and competitor signal cards.', 'Mews / Cloudbeds RMS idea'],
    [RefreshCw, 'Channel and direct booking engine', 'Availability, rates, restrictions, promotions and direct-booking campaigns synchronized in one control view.', 'Distribution growth engine'],
    [ShieldCheck, 'Embedded payments and billing', 'Pre-auth, deposits, room charge, POS folio posting, payment links, checkout automation and receivables tracking.', 'Payment automation'],
    [Wifi, 'Guest messaging and self service', 'Online check-in, kiosk support, digital keys, upsells, guest portal requests and automated pre-arrival messaging.', 'Mobile-first guest journey'],
    [Hotel, 'Spaces and group inventory', 'Ballrooms, cabanas, meeting rooms, rooming lists, allotments, quotes and shoulder-date controls.', 'Beyond-room revenue'],
    [SlidersHorizontal, 'Marketplace and automations', 'Open API, partner app status, task automation, report scheduling and AI summaries for managers.', 'Future support layer'],
  ];
  return (
    <section className="capability-grid" aria-label="Modern PMS capability ideas">
      {items.map(([Icon, title, body, tag]) => (
        <article className="capability-card" key={title}>
          <Icon size={20} />
          <h3>{title}</h3>
          <p>{body}</p>
          <small>{tag}</small>
        </article>
      ))}
    </section>
  );
}

function Reservations({ go }: { go: (p: Page) => void }) {
  const [q, setQ] = useState('');
  const [event, setEvent] = useState<CalEvent | null>(null);
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');
  const [newReservation, setNewReservation] = useState(false);
  const { data = [], isLoading, isError } = useQuery({ queryKey: ['res', q], queryFn: () => api.reservations(q) });
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">HOTEL OPERATIONS</div><h1>Reservations</h1><p>Bookings, scheduled arrivals, event prep and channel imports in one view.</p></div>
        <button className="primary" onClick={() => setNewReservation(true)}><Plus /> New reservation</button>
      </section>
      <div className="filterbar">
        <label><Search size={16} /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reservation, guest or room" /></label>
        <select><option>All statuses</option><option>Confirmed</option><option>Checked in</option><option>Tentative</option></select>
        <select><option>All sources</option><option>Booking.com</option><option>Direct Website</option><option>Corporate</option></select>
        <button className="secondary"><SlidersHorizontal /> Filters</button>
      </div>
      <section className="calendar-wrap panel">
        <div className="calendar-toolbar">
          <div className="calendar-nav"><button className="icon-btn"><ChevronRight className="flip" /></button><b>Today</b><button className="icon-btn"><ChevronRight /></button></div>
          <select><option>Select date</option><option>11 Aug 2026</option></select>
          <select><option>Select space</option><option>All rooms</option><option>Single rooms</option><option>Double rooms</option><option>Triple rooms</option></select>
          <div className="segmented">{(['day', 'week', 'month'] as const).map((x) => <button className={view === x ? 'active' : ''} onClick={() => setView(x)} key={x}>{x}</button>)}</div>
        </div>
        <BookingGrid view={view} onOpen={setEvent} />
      </section>
      {isLoading ? <Skeleton /> : isError ? <ErrorState /> : (
        <article className="panel table-panel">
          <table>
            <thead><tr><th>Reservation</th><th>Guest</th><th>Stay</th><th>Source</th><th>Status</th><th>Payment</th><th>Total</th><th /></tr></thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id}>
                  <td><b>{r.id}</b><span>{r.type} - Room {r.room}</span></td>
                  <td><b>{r.guest} {r.vip && <Badge tone="gold">VIP</Badge>}</b><span>{r.arrival} - {r.nights} nights</span></td>
                  <td>{r.departure}</td><td>{r.source}</td>
                  <td><Badge tone={r.status === 'Confirmed' ? 'healthy' : r.status === 'Tentative' ? 'warning' : 'blue'}>{r.status}</Badge></td>
                  <td>{r.payment}</td><td><b>{r.amount}</b></td>
                  <td><button className="icon-btn" onClick={() => go('checkin')}><ChevronRight /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      )}
      <section className="capability-grid">
        <article className="capability-card"><Users size={20} /><h3>Group block manager</h3><p>Bulk rooming lists, shoulder dates, allotments, quotes and release schedules for corporate and event business.</p><small>Groups functionality</small></article>
        <article className="capability-card"><Hotel size={20} /><h3>Spaces calendar</h3><p>Ballroom, meeting room, cabana and hourly inventory with setup tasks, catering notes and revenue tracking.</p><small>More than room inventory</small></article>
        <article className="capability-card"><ArrowUpRight size={20} /><h3>Upsell opportunities</h3><p>Upgrade, airport transfer, early check-in, premium internet and breakfast offers surfaced before arrival.</p><small>Guest journey revenue</small></article>
        <article className="capability-card"><RefreshCw size={20} /><h3>Live collaboration</h3><p>Reservation moves, check-ins and housekeeping updates will sync instantly across front desk users.</p><small>No ghost bookings</small></article>
      </section>
      {event && (
        <Drawer title={event.title} close={() => setEvent(null)}>
          <Badge tone={event.status}>{event.type}</Badge>
          <p>{event.detail}</p>
          <div className="drawer-list">
            <div><CalendarDays /> Time <b>{event.time}</b></div>
            <div><Hotel /> Room / Area <b>{event.room}</b></div>
            <div><RefreshCw /> ERPNext action <b>Will open linked document</b></div>
          </div>
          <button className="primary">Open detailed reservation</button>
        </Drawer>
      )}
      {newReservation && <ReservationForm close={() => setNewReservation(false)} />}
    </>
  );
}

function ReservationForm({ close }: { close: () => void }) {
  const [kind, setKind] = useState('Room booking');
  return (
    <Drawer title="New reservation" close={close}>
      <div className="form-grid">
        <label>Reservation type<select value={kind} onChange={(e) => setKind(e.target.value)}><option>Room booking</option><option>Group block</option><option>Event / space booking</option><option>Day-use booking</option></select></label>
        <label>Guest / company<input placeholder="Guest name or company" /></label>
        <label>Source<select><option>Direct Website</option><option>Walk-in</option><option>Booking.com</option><option>Expedia</option><option>Corporate</option></select></label>
        <label>Arrival<input type="datetime-local" /></label>
        <label>Departure<input type="datetime-local" /></label>
        <label>Adults<input type="number" min="1" defaultValue="2" /></label>
        <label>Children<input type="number" min="0" defaultValue="0" /></label>
        <label>{kind === 'Event / space booking' ? 'Space' : 'Room type'}<select><option>Executive King</option><option>Deluxe Twin</option><option>Premier Suite</option><option>Ballroom</option><option>Meeting Room</option></select></label>
        <label>Rate plan<select><option>Best Available Rate</option><option>Corporate Rate</option><option>Breakfast Included</option><option>Event Package</option></select></label>
        <label>Payment guarantee<select><option>Card authorization</option><option>Deposit received</option><option>Company account</option><option>Pay at property</option></select></label>
        {kind === 'Group block' && <label>Rooms in block<input type="number" min="2" defaultValue="12" /></label>}
        {kind === 'Event / space booking' && <label>Setup style<select><option>Theatre</option><option>Classroom</option><option>Banquet</option><option>Boardroom</option></select></label>}
        <label className="wide">Notes<textarea placeholder="Preferences, arrival details, airport transfer, dietary notes..." /></label>
      </div>
      <div className="drawer-actions"><button className="primary">Create reservation</button><button className="secondary" onClick={close}>Cancel</button></div>
    </Drawer>
  );
}

function BookingGrid({ view, onOpen }: { view: 'day' | 'week' | 'month'; onOpen: (x: CalEvent) => void }) {
  const days = view === 'day'
    ? ['Tue\nAug 11']
    : view === 'week'
      ? ['Mon\nAug 10', 'Tue\nAug 11', 'Wed\nAug 12', 'Thu\nAug 13', 'Fri\nAug 14', 'Sat\nAug 15', 'Sun\nAug 16']
      : ['Wk 1\nAug', 'Wk 2\nAug', 'Wk 3\nAug', 'Wk 4\nAug', 'Wk 5\nAug'];
  const roomRows = [
    ['Single rooms', '501', 'green'],
    ['Single rooms', '502', 'amber'],
    ['Single rooms', '503', 'green'],
    ['Double rooms', '508', 'green'],
    ['Double rooms', '511', 'red'],
    ['Double rooms', '512', 'amber'],
    ['Double rooms', '514', 'green'],
    ['Triple rooms', '517', 'green'],
    ['Triple rooms', '518', 'amber'],
    ['Triple rooms', '521', 'red'],
  ];
  const bookings = [
    { room: '502', start: 1, span: view === 'month' ? 2 : 4, name: 'Maxwell Carter', tone: 'pink' },
    { room: '508', start: view === 'day' ? 0 : 1, span: 3, name: 'Sarah Williams', tone: 'pink' },
    { room: '512', start: view === 'day' ? 0 : 3, span: 2, name: 'Olivia Bennett', tone: 'pink' },
    { room: '514', start: view === 'day' ? 0 : 5, span: 2, name: 'Ethan Davis', tone: 'pink' },
    { room: '517', start: view === 'day' ? 0 : 4, span: 3, name: 'Ava Martinez', tone: 'pink' },
    { room: '518', start: view === 'day' ? 0 : 2, span: 1, name: 'Liam Johnson', tone: 'pink' },
    { room: '521', start: 0, span: view === 'month' ? 4 : 7, name: 'Out of order - Bathroom renovations', tone: 'muted' },
  ];
  const cols = days.length;
  return (
    <div className={`booking-grid ${view}`} style={{ '--days': cols } as React.CSSProperties}>
      <div className="booking-head empty" />
      {days.map((d, i) => <div className={`booking-head ${i === 4 && view === 'week' ? 'today-col' : ''}`} key={d}>{d.split('\n').map((x) => <span key={x}>{x}</span>)}</div>)}
      {roomRows.map(([group, room, dot], rowIndex) => (
        <div className="booking-row" key={room}>
          <div className="room-label"><small>{rowIndex === 0 || roomRows[rowIndex - 1][0] !== group ? group : ''}</small><i className={dot} /><b>{room}</b></div>
          <div className="booking-cells">
            {days.map((d, i) => <span className={i === 4 && view === 'week' ? 'today-col' : ''} key={`${room}-${d}`} />)}
            {bookings.filter((b) => b.room === room).map((b) => (
              <button className={`booking-pill ${b.tone}`} style={{ gridColumn: `${Math.min(b.start + 1, cols)} / span ${Math.min(b.span, cols - b.start)}` }} key={b.name} onClick={() => onOpen({ id: b.name, title: b.name, time: days[Math.min(b.start, cols - 1)].replace('\n', ' '), room, type: b.tone === 'muted' ? 'Maintenance block' : 'Booking', status: b.tone === 'muted' ? 'warning' : 'gold', detail: `${b.name} scheduled in room ${room}. Click-through will open the booking, folio and room-status detail after ERPNext integration.` })}>
                <span>{b.tone === 'muted' ? 'x' : 'lock'}</span>{b.name}<em>sync</em><em>flow</em>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckIn() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const { refetch, isFetching } = useQuery({ queryKey: ['checkin'], queryFn: api.checkIn, enabled: false });
  const steps = ['Reservation', 'Identity', 'Stay', 'Room', 'Deposit', 'Internet', 'Access', 'Services', 'Signature', 'Complete'];
  if (done) {
    return (
      <section className="success">
        <CheckCircle2 size={54} />
        <div className="eyebrow">CHECK-IN COMPLETE</div>
        <h1>Welcome, Sarah.</h1>
        <p>Room, internet, lift access, deposit and welcome messaging are ready for the stay.</p>
        <div className="success-grid">
          {['Room 508 - Executive King', 'Premium WiFi - 2 devices', 'Mobile credential issued', 'Lift access - Floor 5, Gym, Pool', 'Deposit - PGK 600', 'ERPNext folio - synced'].map((x) => <div key={x}><b>{x.split(' - ')[0]}</b><span>{x.split(' - ')[1]}</span></div>)}
        </div>
        <button className="primary" onClick={() => { setDone(false); setStep(0); }}>Reset demo</button>
      </section>
    );
  }
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">FRONT DESK WORKFLOW</div><h1>Guest check-in</h1><p>ADV-RES-2026-00842 - Sarah Williams - VIP arrival</p></div>
        <Badge tone="gold">Arrival today - 14:00</Badge>
      </section>
      <section className="checkin-visuals">
        <article className="panel journey-card"><h3>Guest readiness score</h3><div className="score-ring"><b>92%</b><span>Ready</span></div><p>Room inspection and welcome amenity are the only remaining items.</p></article>
        <article className="panel">
          <div className="panel-head"><h3>Check-in throughput</h3><Badge tone="healthy">Live</Badge></div>
          <ResponsiveContainer width="100%" height={170}><AreaChart data={trend}><XAxis dataKey="day" /><Tooltip /><Area dataKey="checkins" stroke="#1d4ed8" fill="#dfe9ff" strokeWidth={3} /></AreaChart></ResponsiveContainer>
        </article>
        <article className="panel checklist-card">
          {['Passport verified', 'Booking.com voucher matched', 'Deposit authorized', 'Room 508 inspected', 'Welcome amenity pending'].map((x, i) => <div key={x}><span>{i < 4 ? 'Done' : 'Todo'}</span><b>{x}</b></div>)}
        </article>
      </section>
      <section className="capability-grid">
        <article className="capability-card"><Users size={20} /><h3>Smart guest profile</h3><p>Sarah’s preferences, stay history, dietary notes, VIP tags and duplicate-profile merge status are visible to front desk.</p><small>Guest intelligence</small></article>
        <article className="capability-card"><ShieldCheck size={20} /><h3>Payment automation</h3><p>Deposit pre-auth, incidental limit, room charge approval and checkout settlement are staged for one-click posting.</p><small>Embedded payments</small></article>
        <article className="capability-card"><Wifi size={20} /><h3>Self-service journey</h3><p>Digital check-in, kiosk fallback, mobile credential, guest portal and pre-arrival messages are represented in the flow.</p><small>Mobile-first workflow</small></article>
        <article className="capability-card"><ArrowUpRight size={20} /><h3>Personalized upsells</h3><p>Late checkout, airport transfer, breakfast, spa credit and premium WiFi can be offered from the same check-in screen.</p><small>Revenue per stay</small></article>
      </section>
      <div className="stepper">{steps.map((x, i) => <button className={i === step ? 'current' : i < step ? 'complete' : ''} onClick={() => setStep(i)} key={x}><i>{i < step ? 'OK' : i + 1}</i><span>{x}</span></button>)}</div>
      <article className="wizard panel">
        <div>
          <div className="eyebrow">Step {step + 1} of {steps.length}</div>
          <h2>{steps[step]}</h2>
          <p>{step === 5 ? 'Premium Guest internet is recommended from the Tacitine policy bridge: 50 Mbps, 2 devices, valid until checkout.' : step === 6 ? 'Issue a mobile credential with Room 508, Floor 5, Gym and Pool entitlements.' : 'Review the selected record and confirm the next action for Sarah Williams.'}</p>
          {(step === 5 || step === 6) && (
            <div className="choice-row">
              <button className="selected">{step === 5 ? <Wifi /> : <KeyRound />}Recommended<br /><small>{step === 5 ? 'Premium Guest - 50 Mbps' : 'Mobile credential + lift access'}</small></button>
              <button>{step === 5 ? <Wifi /> : <KeyRound />}Standard<br /><small>{step === 5 ? 'Standard Guest - 15 Mbps' : 'RFID card only'}</small></button>
            </div>
          )}
        </div>
        <footer>
          <button className="secondary" disabled={!step} onClick={() => setStep(step - 1)}>Back</button>
          <button className="primary" disabled={isFetching} onClick={async () => { if (step === steps.length - 1) { await refetch(); setDone(true); } else setStep(step + 1); }}>{isFetching ? 'Completing...' : step === steps.length - 1 ? 'Complete check-in' : 'Continue'} <ChevronRight /></button>
        </footer>
      </article>
    </>
  );
}

function Rooms() {
  const [selected, setSelected] = useState<Room | null>(null);
  const [messageRoom, setMessageRoom] = useState<Room | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [roomFilter, setRoomFilter] = useState('All');
  const roomFilters = ['All', 'Vacant clean', 'Vacant dirty', 'Occupied', 'Maintenance', 'Reserved / VIP'];
  const visibleRooms = rooms.filter((room) => {
    if (roomFilter === 'All') return true;
    if (roomFilter === 'Reserved / VIP') return room.status === 'Reserved' || room.priority.toLowerCase().includes('vip');
    if (roomFilter === 'Vacant dirty') return room.status === 'Vacant dirty' || room.status === 'Service due' || room.status === 'Inspection';
    return room.status.toLowerCase() === roomFilter.toLowerCase();
  });
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">ROOMS & HOUSEKEEPING</div><h1>Room status board</h1><p>Detailed room cards for occupancy, cleaning, maintenance and guest context.</p></div>
        <div className="head-actions"><button className="secondary"><SlidersHorizontal /> Filters</button><button className="primary" onClick={() => setAssignOpen(true)}><Plus /> Assign tasks</button></div>
      </section>
      <div className="room-legend">
        {roomFilters.map((filter) => <button className={roomFilter === filter ? 'active' : ''} onClick={() => setRoomFilter(filter)} key={filter}><Badge tone={filter === 'All' ? 'blue' : filter === 'Vacant dirty' ? 'warning' : filter === 'Occupied' ? 'blue' : filter === 'Maintenance' ? 'critical' : filter === 'Reserved / VIP' ? 'gold' : 'healthy'}>{filter}</Badge></button>)}
      </div>
      <section className="room-board">
        {visibleRooms.map((r) => (
          <button key={r.room} className={`room ${r.status.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setSelected(r)}>
            {r.message && <span className="room-alert" onClick={(e) => { e.stopPropagation(); setMessageRoom(r); }}><MessageSquareWarning size={14} /></span>}
            <b>{r.room}</b><span>{r.status}</span><small>{r.type}</small><em>{r.guest || r.housekeeping}</em>
            <div className="room-checks">
              <RoomCheck ok={r.checks.housekeeping} label="Housekeeping" icon={<CheckCircle2 />} />
              <RoomCheck ok={r.checks.internet} label="Internet" icon={<Wifi />} />
              <RoomCheck ok={r.checks.door} label="Door lock" icon={<DoorOpen />} />
              <RoomCheck ok={r.checks.maintenance} label="Maintenance" icon={<Wrench />} />
            </div>
            <strong className="folio-line">Folio: {r.balance}</strong>
            <i>{r.priority}</i>
          </button>
        ))}
      </section>
      {selected && (
        <Drawer title={`Room ${selected.room}`} close={() => setSelected(null)}>
          <Badge tone={selected.status === 'Occupied' ? 'blue' : selected.status === 'Maintenance' ? 'critical' : selected.status.includes('dirty') ? 'warning' : 'healthy'}>{selected.status}</Badge>
          <h2>{selected.guest || selected.type}</h2>
          <p>{selected.guest ? `${selected.guest} is in-house. ${selected.stay}.` : `${selected.type}. ${selected.stay}.`}</p>
          <div className="drawer-list">
            <div><Hotel /> Room type <b>{selected.type}</b></div>
            <div><Users /> Guest / status <b>{selected.guest || 'No guest in room'}</b></div>
            <div><Wrench /> Housekeeping <b>{selected.housekeeping}</b></div>
            <div><ShieldCheck /> Maintenance <b>{selected.maintenance}</b></div>
            <div><Wifi /> Internet <b>{selected.internet}</b></div>
            <div><DoorOpen /> Door lock <b>{selected.doorLock}</b></div>
            <div><Clock3 /> Folio / balance <b>{selected.balance}</b></div>
            <div><MessageSquareWarning /> Guest message <b>{selected.message || 'No pending message'}</b></div>
          </div>
          <button className="primary">Create room task</button>
        </Drawer>
      )}
      {messageRoom && (
        <Drawer title={`Guest message - Room ${messageRoom.room}`} close={() => setMessageRoom(null)}>
          <Badge tone="warning">Pending guest message</Badge>
          <h2>{messageRoom.guest || messageRoom.type}</h2>
          <p>{messageRoom.message}</p>
          <div className="drawer-list">
            <div><Hotel /> Room <b>{messageRoom.room}</b></div>
            <div><Users /> Guest <b>{messageRoom.guest || 'No active guest'}</b></div>
            <div><Clock3 /> Suggested SLA <b>30 minutes</b></div>
            <div><ClipboardList /> Suggested task group <b>{messageRoom.status === 'Maintenance' ? 'Maintenance' : messageRoom.guest ? 'Guest Services' : 'Housekeeping'}</b></div>
          </div>
          <div className="drawer-actions">
            <button className="primary">Assign task</button>
            <button className="secondary">Mark message reviewed</button>
          </div>
        </Drawer>
      )}
      {assignOpen && <AssignTaskForm close={() => setAssignOpen(false)} room={selected?.room} />}
    </>
  );
}

function RoomCheck({ ok, label, icon }: { ok: boolean; label: string; icon: React.ReactNode }) {
  return <span className={ok ? 'passed' : 'pending'} title={`${label}: ${ok ? 'passed' : 'pending'}`}>{icon}</span>;
}

function Tasks() {
  const [group, setGroup] = useState('All');
  const [newTask, setNewTask] = useState(false);
  const [assignTask, setAssignTask] = useState<(typeof hotelTasks)[number] | null>(null);
  const groups = ['All', 'Housekeeping', 'Maintenance', 'Regular Checks', 'Guest Services'];
  const filtered = group === 'All' ? hotelTasks : hotelTasks.filter((task) => task.group === group);
  const counts = {
    total: hotelTasks.length,
    pending: hotelTasks.filter((x) => x.status === 'Pending').length,
    progress: hotelTasks.filter((x) => x.status === 'In progress').length,
    critical: hotelTasks.filter((x) => x.priority === 'Critical').length,
  };
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">HOTEL OPERATIONS</div><h1>Tasks</h1><p>Manage grouped operational work across housekeeping, maintenance, guest services and regular checks.</p></div>
        <div className="head-actions"><button className="secondary"><SlidersHorizontal /> Filters</button><button className="primary" onClick={() => setNewTask(true)}><Plus /> New task</button></div>
      </section>
      <div className="stat-grid">
        <Stat label="Total tasks" value={counts.total} />
        <Stat label="Pending" value={counts.pending} tone="gold" />
        <Stat label="In progress" value={counts.progress} tone="blue" />
        <Stat label="Critical priority" value={counts.critical} tone="red" />
      </div>
      <section className="task-board">
        <article className="panel task-sidebar">
          <div className="panel-head"><h3>Task groups</h3><Badge tone="blue">Live</Badge></div>
          {groups.map((x) => <button className={group === x ? 'active' : ''} onClick={() => setGroup(x)} key={x}><ClipboardList size={16} />{x}<b>{x === 'All' ? hotelTasks.length : hotelTasks.filter((task) => task.group === x).length}</b></button>)}
        </article>
        <article className="panel table-panel task-table">
          <div className="panel-head"><div><h3>{group} tasks</h3><p>Assign, update and track operational work</p></div><button className="text-btn">Export</button></div>
          <table>
            <thead><tr><th>Task</th><th>Group</th><th>Room / Area</th><th>Owner</th><th>Due</th><th>Status</th><th>Priority</th><th>Manage</th></tr></thead>
            <tbody>
              {filtered.map((task) => (
                <tr key={task.id}>
                  <td><b>{task.title}</b><span>{task.id}</span></td>
                  <td>{task.group}</td>
                  <td>{task.room}</td>
                  <td>{task.owner}</td>
                  <td>{task.due}</td>
                  <td><Badge tone={task.status === 'Done' ? 'healthy' : task.status === 'In progress' ? 'blue' : task.status === 'Scheduled' ? 'gold' : 'warning'}>{task.status}</Badge></td>
                  <td><Badge tone={task.priority === 'Critical' ? 'critical' : task.priority === 'High' ? 'warning' : 'healthy'}>{task.priority}</Badge></td>
                  <td><div className="table-actions"><button className="text-btn" onClick={() => setAssignTask(task)}>Assign</button><button className="text-btn">Update</button><button className="text-btn">Close</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
      <section className="three-col">
        <Activity title="Due next" rows={hotelTasks.slice(0, 4).map((x) => [x.title, `${x.room} - due ${x.due}`, x.priority === 'Critical' ? 'critical' : 'warning'])} />
        <Activity title="Regular checks" rows={hotelTasks.filter((x) => x.group === 'Regular Checks').map((x) => [x.title, `${x.owner} - ${x.status}`, x.status === 'Done' ? 'healthy' : 'blue'])} />
        <Activity title="Task automations" rows={[['Guest message to task', 'Create task from room alert', 'healthy'], ['Room blocked by maintenance', 'Auto-hide from sellable inventory', 'critical'], ['Housekeeping SLA timer', 'Escalate when due time is missed', 'warning']]} />
      </section>
      {newTask && <TaskForm close={() => setNewTask(false)} />}
      {assignTask && <AssignTaskForm close={() => setAssignTask(null)} task={assignTask} room={assignTask.room} />}
    </>
  );
}

function TaskForm({ close }: { close: () => void }) {
  const [type, setType] = useState('Housekeeping');
  return (
    <Drawer title="Create task" close={close}>
      <div className="form-grid">
        <label>Task type<select value={type} onChange={(e) => setType(e.target.value)}><option>Housekeeping</option><option>Maintenance</option><option>Regular Checks</option><option>Guest Services</option><option>Security</option></select></label>
        <label>Priority<select><option>Normal</option><option>High</option><option>Critical</option></select></label>
        <label>Room / area<input placeholder="Room 508, Lobby, Tower A..." /></label>
        <label>Due date<input type="date" /></label>
        <label>Due time<input type="time" /></label>
        <label>Assign to<select><option>Housekeeping team</option><option>Engineering</option><option>Front desk</option><option>Security</option><option>Guest relations</option></select></label>
        {type === 'Housekeeping' && <label>Housekeeping checklist<select><option>Stayover service</option><option>Checkout clean</option><option>Final inspection</option><option>Turn-down service</option></select></label>}
        {type === 'Maintenance' && <label>Asset / issue<select><option>AC / fan coil</option><option>Door lock</option><option>Safe battery</option><option>Plumbing</option><option>Lighting</option></select></label>}
        {type === 'Regular Checks' && <label>Check frequency<select><option>Daily</option><option>Per shift</option><option>Weekly</option><option>Monthly</option></select></label>}
        {type === 'Guest Services' && <label>Guest request category<select><option>Amenity</option><option>Transport</option><option>Laundry</option><option>Food & beverage</option><option>Special preference</option></select></label>}
        <label className="wide">Task description<textarea placeholder="Describe the task, guest message, checklist details or escalation notes..." /></label>
      </div>
      <div className="drawer-actions"><button className="primary">Create task</button><button className="secondary" onClick={close}>Cancel</button></div>
    </Drawer>
  );
}

function AssignTaskForm({ close, task, room }: { close: () => void; task?: (typeof hotelTasks)[number]; room?: string }) {
  return (
    <Drawer title={task ? `Assign ${task.id}` : 'Assign task'} close={close}>
      {task && <><Badge tone={task.priority === 'Critical' ? 'critical' : task.priority === 'High' ? 'warning' : 'healthy'}>{task.priority}</Badge><p>{task.title}</p></>}
      <div className="form-grid">
        <label>Task group<select defaultValue={task?.group || 'Housekeeping'}><option>Housekeeping</option><option>Maintenance</option><option>Regular Checks</option><option>Guest Services</option><option>Security</option></select></label>
        <label>Room / area<input defaultValue={room || ''} placeholder="Room or operational area" /></label>
        <label>Assign to<select defaultValue={task?.owner || 'Housekeeping team'}><option>Housekeeping team</option><option>Engineering</option><option>Front desk</option><option>Security</option><option>Guest relations</option><option>IT</option></select></label>
        <label>Shift<select><option>Morning</option><option>Afternoon</option><option>Night</option><option>On-call</option></select></label>
        <label>Due time<input type="time" defaultValue={task?.due && task.due.includes(':') ? task.due : ''} /></label>
        <label>Status<select defaultValue={task?.status || 'Pending'}><option>Pending</option><option>Scheduled</option><option>In progress</option><option>Done</option></select></label>
        <label className="wide">Assignment note<textarea placeholder="Add instructions, guest message context, parts needed, or escalation notes..." defaultValue={task ? `${task.title} - ${task.room}` : ''} /></label>
      </div>
      <div className="drawer-actions"><button className="primary">Assign task</button><button className="secondary" onClick={close}>Cancel</button></div>
    </Drawer>
  );
}

function Hotspot() {
  const { data = [], isLoading } = useQuery({ queryKey: ['sessions'], queryFn: api.sessions });
  const [activate, setActivate] = useState(false);
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">TACITINE HS5200 INTEGRATION</div><h1>Internet management</h1><p>Guest sessions, service state, bandwidth, net flow and policy-ready accounting.</p></div>
        <button className="primary" onClick={() => setActivate(true)}><Plus /> Activate guest internet</button>
      </section>
      <div className="stat-grid">
        <Stat label="Hotspot users" value="478" trend="120 active sessions" tone="teal" />
        <Stat label="Used traffic" value="12.73 MB" trend="Host 192.168.100.127" />
        <Stat label="WAN average load" value="1.48 Mbps" trend="Last 15 minutes" tone="gold" />
        <Stat label="Failed logins" value="14" trend="0.8% of attempts" tone="red" />
      </div>
      <section className="two-col">
        <article className="panel">
          <div className="panel-head"><div><h3>Network bandwidth usage</h3><p>WAN/LAN trend inspired by Tacitine dashboard</p></div><Badge tone="healthy">Gateway running</Badge></div>
          <ResponsiveContainer width="100%" height={240}><AreaChart data={trend}><XAxis dataKey="day" /><YAxis /><Tooltip /><Area dataKey="internet" stroke="#d64f68" fill="#f3b5c0" strokeWidth={3} /><Line dataKey="occupancy" stroke="#f3a91f" /></AreaChart></ResponsiveContainer>
        </article>
        <article className="panel service-list">
          <div className="panel-head"><h3>Task manager services</h3><button className="text-btn">Restart selected</button></div>
          {tacitineServices.map((x) => <div key={x[0]}><b>{x[0]}</b><span>{x[3]}</span><Badge tone={x[2] === 'Running' ? 'healthy' : 'warning'}>{x[1]} - {x[2]}</Badge></div>)}
        </article>
      </section>
      <section className="two-col">
        <article className="panel table-panel">
          <div className="panel-head"><h3>Active hotspot users</h3><button className="text-btn">Show user detail</button></div>
          {isLoading ? <Skeleton /> : <table><thead><tr><th>User</th><th>Room</th><th>Device</th><th>Plan</th><th>Usage</th><th>Used time</th><th>Status</th></tr></thead><tbody>{data.map((x, i) => <tr key={i}>{x.map((a, j) => <td key={j}>{j === 6 ? <Badge>{a}</Badge> : a}</td>)}</tr>)}</tbody></table>}
        </article>
        <article className="panel table-panel">
          <div className="panel-head"><h3>Real-time net flow</h3><button className="text-btn">Refresh</button></div>
          <table><thead><tr><th>Source IP</th><th>Dest IP</th><th>Protocol</th><th>Service</th><th>Total</th><th>Conn.</th><th>In</th><th>Out</th></tr></thead><tbody>{netFlows.map((x, i) => <tr key={i}>{x.map((a) => <td key={a}>{a}</td>)}</tr>)}</tbody></table>
        </article>
      </section>
      {activate && <Drawer title="Activate guest internet" close={() => setActivate(false)}><Badge tone="blue">ERPNext-ready</Badge><p>When ERPNext is connected this flow will create the Tacitine account from the active room folio, push the package policy and return credentials.</p><div className="drawer-list"><div><Users /> Guest <b>Sarah Williams</b></div><div><Hotel /> Room <b>508</b></div><div><Wifi /> Plan <b>Premium Guest - 50 Mbps</b></div><div><Signal /> Device limit <b>2 devices</b></div></div><button className="primary">Activate access</button></Drawer>}
    </>
  );
}

function Pos() {
  return (
    <>
      <section className="page-head">
        <div><div className="eyebrow">RESTAURANT POS</div><h1>Point of Sale (POS)</h1><p>Reference UI from the supplied POS interface, localized to Kina where visible.</p></div>
        <div className="head-actions"><button className="primary"><Plus /> New order</button><button className="secondary">Sync ERPNext</button></div>
      </section>
      <section className="pos-reference panel">
        <img src="/images/pos-ui-kina.png" alt="Point of Sale interface localized to Kina" />
      </section>
      <section className="capability-grid">
        <article className="capability-card"><UtensilsCrossed size={20} /><h3>Restaurant order flow</h3><p>Menu categories, QR orders, drafts, table orders, KOT printing and bill settlement follow the supplied POS layout.</p><small>Outlet operations</small></article>
        <article className="capability-card"><Hotel size={20} /><h3>Room charge posting</h3><p>Orders can post to guest folios by room, reservation or guest profile once ERPNext is connected.</p><small>Hotel billing bridge</small></article>
        <article className="capability-card"><RefreshCw size={20} /><h3>Inventory sync</h3><p>Recipe ingredients, stock deductions, kitchen tickets and outlet revenue can sync to ERPNext stock and accounts.</p><small>Future integration</small></article>
        <article className="capability-card"><ShieldCheck size={20} /><h3>Shift controls</h3><p>Cash drawer, waiter sessions, void approvals, discounts and audit logs are planned for manager oversight.</p><small>POS governance</small></article>
      </section>
    </>
  );
}

function Hr() {
  return (
    <>
      <section className="page-head"><div><div className="eyebrow">HR & ATTENDANCE</div><h1>Workforce operations</h1><p>Attendance, biometric devices, shift load and payroll exceptions.</p></div><button className="primary"><Plus /> Add attendance</button></section>
      <div className="stat-grid"><Stat label="Total employees" value="312" /><Stat label="Present now" value="286" tone="teal" /><Stat label="Late arrivals" value="12" tone="gold" /><Stat label="Payroll exceptions" value="7" tone="red" /></div>
      <section className="two-col">
        <article className="panel"><div className="panel-head"><h3>Attendance by department</h3><Badge>Today</Badge></div><ResponsiveContainer width="100%" height={260}><BarChart data={[{ n: 'Front desk', v: 22 }, { n: 'Housekeeping', v: 86 }, { n: 'F&B', v: 64 }, { n: 'Security', v: 28 }, { n: 'Engineering', v: 19 }, { n: 'Admin', v: 17 }]}><XAxis dataKey="n" /><Tooltip /><Bar dataKey="v" fill="#0f9d8a" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></article>
        <Activity title="Attendance exceptions" rows={[['Alex Kora', 'Missing checkout - 17:30', 'warning'], ['Mila Dai', 'Late arrival - 24m', 'warning'], ['Joseph Ake', 'Device sync exception', 'critical'], ['Lina Morea', 'Approved overtime - 2.5h', 'healthy']]} />
      </section>
      <article className="panel table-panel"><div className="panel-head"><h3>Biometric device health</h3><button className="text-btn">View all devices</button></div><table><thead><tr><th>Device</th><th>Location</th><th>Type</th><th>Last sync</th><th>Enrolled</th><th>Health</th></tr></thead><tbody>{[['Face Terminal 01', 'Reception', 'Face recognition', '08:45', '120', 'Healthy'], ['Palm Terminal 02', 'Staff entrance', 'Palm recognition', '08:46', '118', 'Healthy'], ['Fingerprint 03', 'Kitchen', 'Fingerprint', '08:32', '64', 'Warning'], ['Hybrid 01', 'Service floor', 'RFID + biometric', '08:44', '109', 'Healthy'], ['Mobile supervisor app', 'Housekeeping', 'GPS clock-in', '08:41', '38', 'Healthy']].map((x) => <tr key={x[0]}>{x.map((v, i) => <td key={v}>{i === 5 ? <Badge tone={v.toLowerCase()}>{v}</Badge> : v}</td>)}</tr>)}</tbody></table></article>
    </>
  );
}

function Ota() {
  return (
    <>
      <section className="page-head"><div><div className="eyebrow">OTA & CHANNEL MANAGER</div><h1>Channel performance</h1><p>Availability, rates, restrictions, parity and reservation import status.</p></div><button className="primary"><RefreshCw /> Sync all channels</button></section>
      <div className="stat-grid"><Stat label="OTA bookings" value="37" trend="Today" /><Stat label="Direct bookings" value="18" trend="+21% this week" tone="teal" /><Stat label="Pending imports" value="3" tone="gold" /><Stat label="Overbooking risk" value="0" tone="teal" /></div>
      <section className="two-col">
        <article className="panel"><div className="panel-head"><h3>Booking source distribution</h3><Badge tone="healthy">Rate parity healthy</Badge></div><ResponsiveContainer width="100%" height={260}><PieChart><Pie data={[{ name: 'Booking.com', value: 32 }, { name: 'Direct', value: 25 }, { name: 'Expedia', value: 17 }, { name: 'Corporate', value: 15 }, { name: 'Agoda', value: 11 }]} dataKey="value" outerRadius={90}>{['#1d4ed8', '#0f9d8a', '#d9a441', '#7b8aa0', '#b5c2cf'].map((c) => <Cell key={c} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></article>
        <Activity title="Import exceptions" rows={[['Booking.com', 'Rate plan mapping - Sarah Williams', 'warning'], ['Expedia', 'Room type mapping - review', 'warning'], ['Trip.com', 'Imported successfully', 'healthy'], ['Agoda', 'Credit card token pending', 'critical']]} />
      </section>
      <section className="capability-grid">
        <article className="capability-card"><ArrowUpRight size={20} /><h3>Rate intelligence</h3><p>Demand forecast, competitor position, pickup pace and automated rate-change recommendations for each room type.</p><small>Revenue management</small></article>
        <article className="capability-card"><CalendarDays size={20} /><h3>Availability matrix</h3><p>Multi-property availability, restrictions, stop-sell controls and price differentials from a single grid.</p><small>Portfolio control</small></article>
        <article className="capability-card"><MonitorPlay size={20} /><h3>Direct booking engine</h3><p>Promotion rules, package display, amenity icons and commission-free website booking performance.</p><small>Reduce OTA reliance</small></article>
        <article className="capability-card"><Users size={20} /><h3>Guest marketing CRM</h3><p>Segmented email campaigns, reputation requests, repeat-stay targeting and abandoned booking recovery.</p><small>Demand creation</small></article>
      </section>
      <article className="panel table-panel"><div className="panel-head"><h3>Channel controls</h3><button className="text-btn">Open rate grid</button></div><table><thead><tr><th>Channel</th><th>Rooms open</th><th>ADR</th><th>Parity</th><th>Last sync</th><th>Status</th></tr></thead><tbody>{[['Booking.com', '42', 'PGK 612', 'Matched', '08:45', 'Healthy'], ['Expedia', '39', 'PGK 608', 'Needs review', '08:39', 'Warning'], ['Agoda', '41', 'PGK 612', 'Matched', '08:42', 'Healthy'], ['Direct Website', '48', 'PGK 595', 'Promo active', '08:46', 'Healthy'], ['Corporate', '22', 'PGK 540', 'Contracted', '08:31', 'Healthy']].map((x) => <tr key={x[0]}>{x.map((v, i) => <td key={v}>{i === 5 ? <Badge tone={v.toLowerCase()}>{v}</Badge> : v}</td>)}</tr>)}</tbody></table></article>
    </>
  );
}

function Operations() {
  return (
    <>
      <section className="page-head dark-head"><div><div className="eyebrow"><span className="live-dot" /> LIVE OPERATIONS CENTRE</div><h1>Everything happening now.</h1><p>Front desk, service, security and IT signals in one operational timeline.</p></div><button className="secondary dark">Pause live updates</button></section>
      <div className="live-grid"><Stat label="Guests checked in" value="286" tone="teal" /><Stat label="Rooms ready" value="132" /><Stat label="POS transactions" value="87" /><Stat label="Hotspot sessions" value="1,246" tone="teal" /><Stat label="Access events" value="4,818" tone="gold" /><Stat label="Critical alerts" value="2" tone="red" /></div>
      <section className="ops-command">
        <article className="panel ops-map">
          <div className="panel-head"><div><h3>Property command map</h3><p>Live status by operational zone</p></div><Badge tone="healthy">12 zones online</Badge></div>
          {['Lobby', 'Front desk', 'Tower A', 'Tower B', 'Restaurant', 'Ballroom', 'Kitchen', 'Pool', 'Gym', 'Server room', 'Loading bay', 'Staff entry'].map((zone, i) => (
            <button className={i === 9 || i === 10 ? 'risk' : i === 5 ? 'busy' : ''} key={zone}>
              <b>{zone}</b><span>{i === 9 ? 'Access denied event' : i === 10 ? 'Door held open' : i === 5 ? 'Conference setup' : 'Normal operations'}</span>
            </button>
          ))}
        </article>
        <article className="panel">
          <div className="panel-head"><h3>Operational workload</h3><Badge tone="warning">9 open SLAs</Badge></div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[{ n: 'Desk', v: 48 }, { n: 'HK', v: 72 }, { n: 'F&B', v: 56 }, { n: 'IT', v: 18 }, { n: 'Eng', v: 27 }, { n: 'Sec', v: 35 }]}>
              <XAxis dataKey="n" /><Tooltip /><Bar dataKey="v" fill="#0f9d8a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
      <section className="three-col">
        <Activity title="Live event stream" rows={securityEvents.map((x) => [x[1], `${x[0]} - ${x[3]}`, x[2]])} />
        <Activity title="Integration signals" rows={integrations.slice(0, 6).map((x) => [x[0], `Last sync ${x[2]} - ${x[3]}`, x[1]])} />
        <Activity title="Escalation queue" rows={[['VIP arrival risk', 'Room 508 inspection due before 12:30', 'warning'], ['Tacitine threshold', 'WAN load crossed 80 percent', 'warning'], ['Kitchen ticket spike', '18 orders waiting over 12 minutes', 'critical'], ['Night audit prep', '3 OTA imports need mapping', 'warning']]} />
      </section>
      <section className="capability-grid">
        <article className="capability-card"><MonitorPlay size={20} /><h3>War-room mode</h3><p>Presentation-ready control surface with live streams, incident ownership, SLA timers and team handoff notes.</p><small>Operations cockpit</small></article>
        <article className="capability-card"><RefreshCw size={20} /><h3>Automation playbooks</h3><p>Trigger housekeeping, engineering, security and guest messages when events cross thresholds.</p><small>Future ERPNext workflow</small></article>
        <article className="capability-card"><CalendarDays size={20} /><h3>Shift-aware timeline</h3><p>Events grouped by operational shift, manager handover, open tasks and forecasted bottlenecks.</p><small>Manager continuity</small></article>
        <article className="capability-card"><Signal size={20} /><h3>Device health overlay</h3><p>Door, lift, POS, WiFi, PMS and biometric signals shown beside real guest-impacting events.</p><small>Integrated device layer</small></article>
      </section>
    </>
  );
}

function Access() {
  return (
    <>
      <section className="page-head"><div><div className="eyebrow">ACCESS CONTROL</div><h1>Security operations</h1><p>Doors, credentials, controllers and access events in one command view.</p></div><button className="danger"><ShieldCheck /> Emergency override</button></section>
      <div className="stat-grid"><Stat label="Active credentials" value="350" /><Stat label="Doors online" value="78 / 80" tone="teal" /><Stat label="Access granted" value="4,818" /><Stat label="Access denied" value="14" tone="red" /></div>
      <section className="access-grid">
        <article className="panel controller-grid">
          <div className="panel-head"><div><h3>Door controller estate</h3><p>Controller, lock and battery health by area</p></div><Badge tone="warning">2 need review</Badge></div>
          {[
            ['Lobby controller', '12 doors', 'Online', 'healthy'],
            ['Tower A controller', '28 doors', 'Online', 'healthy'],
            ['Tower B controller', '24 doors', 'Online', 'healthy'],
            ['Service floor', '8 doors', 'Offline 6m', 'critical'],
            ['Pool gate', '2 doors', 'Low battery', 'warning'],
            ['Server room', '2 doors', 'Strict mode', 'gold'],
          ].map((x) => <div key={x[0]}><DoorOpen size={17} /><b>{x[0]}</b><span>{x[1]}</span><Badge tone={x[3]}>{x[2]}</Badge></div>)}
        </article>
        <article className="panel credential-panel">
          <div className="panel-head"><h3>Credential lifecycle</h3><Badge tone="blue">Today</Badge></div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={[{ h: '06', issue: 12, revoke: 2 }, { h: '08', issue: 42, revoke: 7 }, { h: '10', issue: 56, revoke: 9 }, { h: '12', issue: 34, revoke: 5 }, { h: '14', issue: 44, revoke: 8 }, { h: '16', issue: 28, revoke: 4 }]}>
              <XAxis dataKey="h" /><Tooltip /><Area dataKey="issue" stroke="#1d4ed8" fill="#dfe9ff" /><Area dataKey="revoke" stroke="#d34747" fill="#ffe1e1" />
            </AreaChart>
          </ResponsiveContainer>
        </article>
      </section>
      <section className="three-col">
        <Activity title="Live access events" rows={securityEvents.map((x) => [x[1], `${x[0]} - ${x[3]}`, x[2]])} />
        <Activity title="Guest credential - Sarah Williams" rows={[['Room 508', 'Mobile credential active', 'healthy'], ['Floor 5', 'Lift entitlement granted', 'healthy'], ['Gym and Pool', 'Amenity access until checkout', 'gold'], ['Checkout revoke', 'Scheduled 16 Aug 11:00', 'blue']]} />
        <Activity title="Security workflows" rows={[['Emergency lockdown', 'One-click zone policy prepared', 'critical'], ['Visitor pass', 'Contractor badge expires 17:00', 'warning'], ['Audit export', 'Syslog and ERPNext bridge active', 'healthy'], ['Anti-passback', 'Enabled for staff entrance', 'healthy']]} />
      </section>
      <section className="capability-grid">
        <article className="capability-card"><ShieldCheck size={20} /><h3>Zone lockdown</h3><p>Instant lock, unlock, schedule override and evacuation mode by zone, floor or controller group.</p><small>Emergency operations</small></article>
        <article className="capability-card"><Users size={20} /><h3>Visitor management</h3><p>Contractor, vendor and event passes with escort notes, validity windows and restricted doors.</p><small>Non-guest access</small></article>
        <article className="capability-card"><KeyRound size={20} /><h3>Credential templates</h3><p>Guest, VIP, staff, housekeeping and event templates that post permissions to door and lift systems.</p><small>Reusable policy layer</small></article>
        <article className="capability-card"><RefreshCw size={20} /><h3>Audit and compliance</h3><p>Denied events, forced doors, door-held-open alarms and credential changes linked to user accountability.</p><small>Security audit trail</small></article>
      </section>
    </>
  );
}

function Lift() {
  const cols = ['B', 'L', '1', '2', '3', '4', '5', 'Exec', 'Gym', 'Pool', 'Park', 'Svc'];
  const rows = ['Guest', 'VIP guest', 'Reception', 'Housekeeping', 'Maintenance', 'Security'];
  const [editing, setEditing] = useState(false);
  const canAccess = (i: number, j: number) => (i === 0 && [1, 6, 8, 9].includes(j)) || (i === 1 && j !== 11) || i > 3;
  return (
    <>
      <section className="page-head"><div><div className="eyebrow">LIFT ACCESS</div><h1>Floor access matrix</h1><p>Permission policy by identity, floor, facility and credential.</p></div><div className="head-actions">{editing && <button className="secondary" onClick={() => setEditing(false)}>Cancel</button>}<button className="primary" onClick={() => setEditing(!editing)}>{editing ? 'Save permissions' : 'Edit permissions'}</button></div></section>
      {editing && <div className="edit-banner"><b>Editing mode enabled</b><span>Click cells to preview permission changes. Saving will push the policy to lift controllers after ERPNext integration.</span></div>}
      <div className="stat-grid"><Stat label="Lift controllers" value="6 / 6" tone="teal" /><Stat label="Trips today" value="3,842" /><Stat label="Denied attempts" value="9" tone="gold" /><Stat label="VIP entitlements" value="18" tone="blue" /></div>
      <section className="lift-dashboard">
        <article className="panel lift-bank">
          <div className="panel-head"><div><h3>Live lift bank</h3><p>Cabin position, direction and service mode</p></div><Badge tone="healthy">All banks online</Badge></div>
          {[
            ['Lift A', 'Floor 5', 'Up', 'Guest traffic'],
            ['Lift B', 'Lobby', 'Idle', 'Normal'],
            ['Lift C', 'Floor 2', 'Down', 'Conference load'],
            ['Service Lift', 'B1', 'Up', 'Housekeeping'],
          ].map((x) => <div key={x[0]}><b>{x[0]}</b><span>{x[1]}</span><small>{x[2]}</small><Badge tone={x[3] === 'Conference load' ? 'warning' : 'healthy'}>{x[3]}</Badge></div>)}
        </article>
        <article className="panel">
          <div className="panel-head"><h3>Floor demand by hour</h3><Badge tone="blue">Today</Badge></div>
          <ResponsiveContainer width="100%" height={245}>
            <BarChart data={[{ n: 'Lobby', v: 820 }, { n: 'F5', v: 440 }, { n: 'Exec', v: 138 }, { n: 'Gym', v: 204 }, { n: 'Pool', v: 178 }, { n: 'Svc', v: 390 }]}>
              <XAxis dataKey="n" /><Tooltip /><Bar dataKey="v" fill="#1d4ed8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </section>
      <article className={`panel matrix ${editing ? 'editing' : ''}`}><table><thead><tr><th>Identity</th>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={r}><td><b>{r}</b></td>{cols.map((c, j) => <td key={c}><button className={canAccess(i, j) ? 'allow' : 'deny'} disabled={!editing}>{canAccess(i, j) ? 'Y' : '-'}</button></td>)}</tr>)}</tbody></table></article>
      <section className="three-col">
        <Activity title="Lift policies" rows={[['Guest policy', 'Room floor + lobby + amenities', 'healthy'], ['VIP policy', 'Executive, gym, pool, parking', 'gold'], ['Service policy', 'Back-of-house and service lift', 'blue'], ['Emergency policy', 'Fire override ready', 'critical']]} />
        <Activity title="Recent lift events" rows={[['Sarah Williams', 'Lift A to Floor 5 granted', 'healthy'], ['Unknown card', 'Executive floor denied', 'warning'], ['Housekeeping team', 'Service lift to 5 approved', 'blue'], ['Controller sync', 'All policies posted 08:41', 'healthy']]} />
        <Activity title="Automation ideas" rows={[['Checkout revoke', 'Remove floor access at folio close', 'blue'], ['Event mode', 'Open ballroom floor for delegates', 'healthy'], ['After-hours gym', 'Apply amenity schedule limits', 'warning'], ['Fire command', 'Release all lifts to lobby', 'critical']]} />
      </section>
      <section className="capability-grid">
        <article className="capability-card"><DoorOpen size={20} /><h3>Lift and door unification</h3><p>One credential policy can activate room doors, lift floors, amenities and back-of-house zones together.</p><small>Unified access layer</small></article>
        <article className="capability-card"><CalendarDays size={20} /><h3>Schedule-based permissions</h3><p>Gym, pool, executive lounge and event-floor access can follow guest stay dates and amenity opening hours.</p><small>Time-aware access</small></article>
        <article className="capability-card"><Users size={20} /><h3>Group lift profiles</h3><p>Conference delegate groups can receive temporary ballroom and selected amenity access from the event booking.</p><small>Events and groups</small></article>
        <article className="capability-card"><RefreshCw size={20} /><h3>ERPNext policy sync</h3><p>Room move, checkout, late checkout and staff roster changes can push updated lift entitlements automatically.</p><small>Future automation</small></article>
      </section>
    </>
  );
}

function Integrations() {
  const { data = [], isLoading, isError, refetch, isFetching } = useQuery({ queryKey: ['integrations'], queryFn: api.integrations });
  return (
    <>
      <section className="page-head"><div><div className="eyebrow">SYSTEM ADMINISTRATION</div><h1>Integration health centre</h1><p>Connection, performance and exception status across the hotel ecosystem.</p></div><button className="primary" onClick={() => refetch()}><RefreshCw /> {isFetching ? 'Testing...' : 'Test connections'}</button></section>
      {isLoading ? <Skeleton /> : isError ? <ErrorState /> : <article className="panel integration-grid">{data.map((x) => <article key={x[0]}><div><i className={`dot ${x[1]}`} /><b>{x[0]}</b><Badge tone={x[1]}>{x[1]}</Badge></div><span>Last successful sync <b>{x[2]}</b></span><span>Average latency <b>{x[3]}</b></span><footer><button className="text-btn">View logs</button><button className="text-btn">Retry</button></footer></article>)}</article>}
    </>
  );
}

function Drawer({ title, close, children }: { title: string; close: () => void; children: React.ReactNode }) {
  return <div className="overlay"><aside className="drawer"><header><div><div className="eyebrow">DETAIL</div><h2>{title}</h2></div><button className="icon-btn" onClick={close}><X /></button></header><div className="drawer-body">{children}</div></aside></div>;
}

function SearchModal({ close, go }: { close: () => void; go: (p: Page) => void }) {
  const [q, setQ] = useState('');
  const result = useMemo(() => [
    ['Sarah Williams', 'Guest - Room 508', 'checkin'],
    ['ADV-RES-2026-00842', 'Reservation - VIP - Booking.com', 'reservations'],
    ['Room 508', 'Room - Executive King', 'rooms'],
    ['Tacitine Gateway', 'Device - Network room', 'hotspot'],
  ].filter((r) => r.join(' ').toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <div className="overlay command">
      <div className="command-box">
        <header><Search /><input autoFocus placeholder="Search guests, reservations, rooms, devices..." value={q} onChange={(e) => setQ(e.target.value)} /><kbd>ESC</kbd></header>
        <span className="command-label">Suggested results</span>
        {result.map((r) => <button key={r[0]} onClick={() => { go(r[2] as Page); close(); }}><span className="search-mark"><Command size={16} /></span><div><b>{r[0]}</b><small>{r[1]}</small></div><ChevronRight /></button>)}
      </div>
    </div>
  );
}

function Skeleton() {
  return <div className="skeleton"><i /><i /><i /></div>;
}

function ErrorState() {
  return <div className="error-state"><ShieldCheck /><h2>We could not load that data.</h2><p>This is a controlled prototype error state. Try again to continue the demonstration.</p><button className="primary">Try again</button></div>;
}

function ToastMessage({ toast }: { toast: Toast }) {
  return <div className="toast"><b>{toast.title}</b><span>{toast.body}</span></div>;
}

function LandingPage({ onLogin }: { onLogin: () => void }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <div className="logo landing-logo"><b>ADV</b><span>HOSPITALITY<br />SUITE</span></div>
        <button className="secondary" onClick={() => setShowLogin(true)}><LogIn size={17} /> Login</button>
      </nav>
      <section className="landing-hero">
        <div>
          <div className="eyebrow"><span className="live-dot" /> FUTURE READY HOTEL OPERATIONS</div>
          <h1>Run rooms, guests, access, POS and revenue from one intelligent hospitality suite.</h1>
          <p>ADV Hospitality Suite brings PMS, reservations, check-in, housekeeping, tasks, Tacitine internet, access control, lift permissions, POS, HR and OTA operations into one connected hotel platform.</p>
          <div className="landing-actions">
            <button className="primary" onClick={() => setShowLogin(true)}><LogIn size={17} /> Enter demo</button>
            <span>Secure demo access for hotel operations teams</span>
          </div>
        </div>
        <article className="landing-panel">
          <div className="panel-head"><h3>Live property pulse</h3><Badge tone="healthy">Online</Badge></div>
          <div className="landing-metrics">
            <Stat label="Occupancy" value="78.6%" tone="teal" />
            <Stat label="Arrivals" value="48" tone="gold" />
            <Stat label="Open tasks" value="8" tone="red" />
            <Stat label="WiFi sessions" value="1,246" tone="blue" />
          </div>
        </article>
      </section>
      <section className="landing-slider">
        <article><Badge tone="teal">01</Badge><h2>Operate every room from one calendar.</h2><p>Drag bookings, spot occupancy gaps, inspect room readiness, and convert guest messages into tasks.</p></article>
        <article><Badge tone="gold">02</Badge><h2>Connect devices to daily work.</h2><p>Tacitine WiFi, door locks, lift permissions and biometric attendance become visible operational signals.</p></article>
        <article><Badge tone="blue">03</Badge><h2>Grow revenue beyond rooms.</h2><p>Use POS, direct booking, spaces, groups, rate intelligence and OTA controls to increase total guest value.</p></article>
      </section>
      <section className="landing-features">
        {[
          ['Unified PMS', 'Reservations, calendar, folios, room status and guest profiles.'],
          ['Operations tasks', 'Housekeeping, maintenance, regular checks and guest requests.'],
          ['Connected property', 'Tacitine internet, door locks, lift access and device health.'],
          ['Business control', 'POS, HR, OTA, revenue intelligence and ERPNext-ready workflows.'],
        ].map((x) => <article className="capability-card" key={x[0]}><h3>{x[0]}</h3><p>{x[1]}</p><small>Included in demo</small></article>)}
      </section>
      <section className="landing-showcase">
        <div><div className="eyebrow">BUILT FOR HOTEL TEAMS</div><h2>Front desk, housekeeping, security, F&B and management see the same truth.</h2><p>Every section in the prototype is designed to later connect to ERPNext records, device events, guest workflows and operational automations.</p></div>
        <div className="showcase-grid">
          {['Reservations', 'Guest check-in', 'Rooms', 'Tasks', 'Internet', 'Access', 'Lift', 'POS', 'HR', 'OTA'].map((x) => <span key={x}>{x}</span>)}
        </div>
      </section>
      {showLogin && <div className="login-modal overlay"><LoginPage onLogin={onLogin} onBack={() => setShowLogin(false)} /></div>}
    </main>
  );
}

function LoginPage({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin@123');
  const [error, setError] = useState('');
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      setError('');
      onLogin();
    } else {
      setError('Invalid demo credential. Use admin / admin@123.');
    }
  };
  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="logo login-logo"><b>ADV</b><span>HOSPITALITY<br />SUITE</span></div>
        <div>
          <div className="eyebrow">SECURE ACCESS</div>
          <h1>Login</h1>
          <p>Enter your demo access credential to continue.</p>
        </div>
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" /></label>
        <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" /></label>
        {error && <div className="login-error">{error}</div>}
        <button className="primary" type="submit"><LogIn size={17} /> Login</button>
        <button className="text-btn" type="button" onClick={onBack}>Cancel</button>
      </form>
    </main>
  );
}

export default function App() {
  const [authView, setAuthView] = useState<'landing' | 'app'>('landing');
  const [page, setPage] = useState<Page>('dashboard');
  const [search, setSearch] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const store = useDemoStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', store.dark);
    document.body.classList.toggle('presentation', store.presentation);
  }, [store.dark, store.presentation]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === 'Escape') setSearch(false);
    };
    addEventListener('keydown', f);
    return () => removeEventListener('keydown', f);
  }, []);

  const go = (p: Page) => {
    setPage(p);
    setMobileNavOpen(false);
  };
  const label = nav.flatMap((x) => x.items).find((x) => x[0] === page)?.[1] || 'ADV Hospitality Suite';
  const notifyAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const button = (event.target as HTMLElement).closest('button');
    if (!button || button.closest('.sidebar')) return;
    const text = button.textContent?.trim().replace(/\s+/g, ' ') || 'Action';
    setToast({ title: `${text} requested`, body: 'Demo message queued. ERPNext/live device events will be connected in the next integration phase.' });
  };

  if (authView === 'landing') return <LandingPage onLogin={() => setAuthView('app')} />;

  let content: React.ReactNode;
  switch (page) {
    case 'dashboard': content = <Dashboard go={go} />; break;
    case 'operations': content = <Operations />; break;
    case 'reservations': content = <Reservations go={go} />; break;
    case 'checkin': content = <CheckIn />; break;
    case 'rooms': content = <Rooms />; break;
    case 'tasks': content = <Tasks />; break;
    case 'hotspot': content = <Hotspot />; break;
    case 'access': content = <Access />; break;
    case 'lift': content = <Lift />; break;
    case 'pos': content = <Pos />; break;
    case 'hr': content = <Hr />; break;
    case 'ota': content = <Ota />; break;
    default: content = <Integrations />;
  }

  return (
    <div className={`app ${navCollapsed ? 'nav-collapsed' : ''} ${mobileNavOpen ? 'mobile-nav-open' : ''}`} onClickCapture={notifyAction}>
      {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo"><b>ADV</b><span>HOSPITALITY<br />SUITE</span></div>
          <button className="collapse-btn" onClick={() => setNavCollapsed(!navCollapsed)} aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}>
            <ChevronRight />
          </button>
        </div>
        <p className="tagline">Unified Hotel Operations, Guest Experience, Security and Business Management Platform</p>
        <nav>{nav.map((g) => <div className="nav-group" key={g.group}><label>{g.group}</label>{g.items.map(([id, name, Icon]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)} title={name}><span className="nav-icon" style={{ '--nav-color': navTone[id] } as React.CSSProperties}><Icon size={18} /></span><span>{name}</span></button>)}</div>)}</nav>
        <div className="sidebar-foot">
          <select value={store.role} onChange={(e) => store.set({ role: e.target.value })}>
            {roles.map((x) => <option key={x}>{x}</option>)}
          </select>
          <div>
            <div className="avatar">GM</div>
            <span><b>Gabriel Muri</b><small>{store.role}</small></span>
            <button className="logout-btn" onClick={() => setAuthView('landing')} title="Logout"><LogOut size={15} /></button>
          </div>
        </div>
      </aside>
      <main className="main"><Header page={label} setSearch={setSearch} toggleMobileNav={() => setMobileNavOpen(true)} /><div className="content">{content}</div></main>
      {search && <SearchModal close={() => setSearch(false)} go={go} />}
      {toast && <ToastMessage toast={toast} />}
    </div>
  );
}
