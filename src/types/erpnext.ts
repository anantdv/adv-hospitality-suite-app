/** Shape contracts used when mock services are replaced with Frappe/ERPNext resources. */
export interface Customer { name:string; customer_name:string; customer_group:string }
export interface Contact { name:string; first_name:string; last_name:string; email_id?:string; mobile_no?:string }
export interface HotelGuest extends Customer { loyalty_tier?:string; vip?:boolean; preferences?:string[] }
export interface Reservation { name:string; guest:string; arrival_date:string; departure_date:string; room_type:string; room?:string; status:string }
export interface Room { name:string; room_number:string; room_type:string; status:string; property:string }
export interface SalesInvoice { name:string; customer:string; grand_total:number; outstanding_amount:number; status:string }
export interface PaymentEntry { name:string; party:string; paid_amount:number; mode_of_payment:string }
export interface PosInvoice { name:string; outlet:string; customer?:string; grand_total:number; status:string }
export interface Employee { name:string; employee_name:string; department:string; status:string }
export interface Attendance { name:string; employee:string; attendance_date:string; status:string; working_hours?:number }
export interface ShiftAssignment { name:string; employee:string; shift_type:string; start_date:string; end_date:string }
export interface Asset { name:string; asset_name:string; location:string; status:string }
export interface MaintenanceVisit { name:string; asset:string; maintenance_date:string; status:string }
export interface Issue { name:string; subject:string; priority:string; status:string }
export interface Communication { name:string; reference_doctype:string; reference_name:string; content:string; sent_or_received:string }
