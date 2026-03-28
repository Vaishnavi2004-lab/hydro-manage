import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Member {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  batch: string;
  plan: string;
  joined: string;
  status: "Active" | "Pending" | "Expired";
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  name: string;
  date: string;
  checkin: string;
  batch: string;
  status: "Present" | "Absent" | "Late";
}

export interface Payment {
  id: string;
  memberId: string;
  name: string;
  plan: string;
  amount: number;
  date: string;
  mode: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  contact: string;
  shift: string;
  status: "On Duty" | "Off Duty" | "On Leave";
}

export interface WaterEntry {
  id: string;
  date: string;
  ph: string;
  chlorine: string;
  temp: string;
  cleaning: string;
  remarks: string;
}

export interface ActivityLog {
  name: string;
  action: string;
  time: string;
}

interface AppContextType {
  members: Member[];
  attendance: AttendanceRecord[];
  payments: Payment[];
  staff: Staff[];
  waterEntries: WaterEntry[];
  activityLog: ActivityLog[];
  addMember: (m: Omit<Member, "id">) => void;
  updateMember: (id: string, m: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addAttendance: (a: Omit<AttendanceRecord, "id">) => void;
  deleteAttendance: (id: string) => void;
  addPayment: (p: Omit<Payment, "id">) => void;
  deletePayment: (id: string) => void;
  addStaff: (s: Omit<Staff, "id">) => void;
  updateStaff: (id: string, s: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  addWaterEntry: (w: Omit<WaterEntry, "id">) => void;
  deleteWaterEntry: (id: string) => void;
  nextMemberId: () => string;
  nextPaymentId: () => string;
  nextStaffId: () => string;
}

const initialMembers: Member[] = [
  { id: "M001", name: "Rajesh Kumar", age: 32, gender: "Male", phone: "9876543210", address: "Chandrapur, Ward 5", batch: "6AM–7AM", plan: "Annual", joined: "2025-01-15", status: "Active" },
  { id: "M002", name: "Priya Sharma", age: 28, gender: "Female", phone: "9876543211", address: "Civil Lines, Chandrapur", batch: "7AM–8AM", plan: "Monthly", joined: "2026-02-01", status: "Active" },
  { id: "M003", name: "Amit Patel", age: 24, gender: "Male", phone: "9876543212", address: "Mul Road, Chandrapur", batch: "8AM–9AM", plan: "Quarterly", joined: "2026-03-20", status: "Pending" },
  { id: "M004", name: "Sneha Reddy", age: 30, gender: "Female", phone: "9876543213", address: "Gandhi Chowk", batch: "4PM–5PM", plan: "Annual", joined: "2025-06-10", status: "Active" },
  { id: "M005", name: "Vikram Singh", age: 35, gender: "Male", phone: "9876543214", address: "Ballarpur Road", batch: "5PM–6PM", plan: "Monthly", joined: "2025-12-01", status: "Expired" },
  { id: "M006", name: "Kavitha Nair", age: 26, gender: "Female", phone: "9876543215", address: "Tukum, Chandrapur", batch: "6PM–7PM", plan: "Quarterly", joined: "2025-11-15", status: "Active" },
  { id: "M007", name: "Suresh Babu", age: 40, gender: "Male", phone: "9876543216", address: "Nagpur Road", batch: "6AM–7AM", plan: "Day Pass", joined: "2026-03-25", status: "Active" },
  { id: "M008", name: "Lakshmi Devi", age: 22, gender: "Female", phone: "9876543217", address: "Ghugus, Chandrapur", batch: "7AM–8AM", plan: "Annual", joined: "2026-03-24", status: "Active" },
];

const initialAttendance: AttendanceRecord[] = [
  { id: "A001", memberId: "M001", name: "Rajesh Kumar", date: "2026-03-28", checkin: "06:15", batch: "6AM–7AM", status: "Present" },
  { id: "A002", memberId: "M002", name: "Priya Sharma", date: "2026-03-28", checkin: "07:02", batch: "7AM–8AM", status: "Present" },
  { id: "A003", memberId: "M004", name: "Sneha Reddy", date: "2026-03-28", checkin: "", batch: "8AM–9AM", status: "Absent" },
  { id: "A004", memberId: "M006", name: "Kavitha Nair", date: "2026-03-28", checkin: "16:10", batch: "4PM–5PM", status: "Present" },
  { id: "A005", memberId: "M007", name: "Suresh Babu", date: "2026-03-28", checkin: "17:00", batch: "5PM–6PM", status: "Late" },
  { id: "A006", memberId: "M003", name: "Amit Patel", date: "2026-03-28", checkin: "06:05", batch: "6AM–7AM", status: "Present" },
  { id: "A007", memberId: "M008", name: "Lakshmi Devi", date: "2026-03-28", checkin: "07:10", batch: "7AM–8AM", status: "Present" },
];

const initialPayments: Payment[] = [
  { id: "PAY-001", memberId: "M001", name: "Rajesh Kumar", plan: "Annual", amount: 12000, date: "2026-03-25", mode: "UPI", status: "Paid" },
  { id: "PAY-002", memberId: "M002", name: "Priya Sharma", plan: "Monthly", amount: 1500, date: "2026-03-20", mode: "Cash", status: "Paid" },
  { id: "PAY-003", memberId: "M003", name: "Amit Patel", plan: "Quarterly", amount: 4000, date: "2026-03-18", mode: "Online", status: "Pending" },
  { id: "PAY-004", memberId: "M004", name: "Sneha Reddy", plan: "Annual", amount: 12000, date: "2026-03-15", mode: "Cheque", status: "Paid" },
  { id: "PAY-005", memberId: "M005", name: "Vikram Singh", plan: "Monthly", amount: 1500, date: "2026-03-10", mode: "UPI", status: "Overdue" },
  { id: "PAY-006", memberId: "M006", name: "Kavitha Nair", plan: "Quarterly", amount: 4000, date: "2026-03-05", mode: "Cash", status: "Paid" },
  { id: "PAY-007", memberId: "M007", name: "Suresh Babu", plan: "Day Pass", amount: 200, date: "2026-03-28", mode: "Cash", status: "Paid" },
];

const initialStaff: Staff[] = [
  { id: "S001", name: "Mahesh Jadhav", role: "Head Lifeguard", contact: "9800011111", shift: "6AM – 2PM", status: "On Duty" },
  { id: "S002", name: "Ritu Deshmukh", role: "Swimming Coach", contact: "9800022222", shift: "7AM – 12PM", status: "On Duty" },
  { id: "S003", name: "Ganesh Patil", role: "Maintenance Staff", contact: "9800033333", shift: "6AM – 2PM", status: "On Duty" },
  { id: "S004", name: "Pooja Kulkarni", role: "Swimming Coach", contact: "9800044444", shift: "4PM – 8PM", status: "Off Duty" },
  { id: "S005", name: "Sanjay More", role: "Receptionist", contact: "9800055555", shift: "8AM – 4PM", status: "On Duty" },
  { id: "S006", name: "Neha Wagh", role: "Lifeguard", contact: "9800066666", shift: "2PM – 8PM", status: "On Leave" },
  { id: "S007", name: "Arun Shinde", role: "Water Quality Technician", contact: "9800077777", shift: "6AM – 2PM", status: "On Duty" },
];

const initialWater: WaterEntry[] = [
  { id: "W001", date: "2026-03-28", ph: "7.3", chlorine: "2.5", temp: "28", cleaning: "Completed", remarks: "All parameters normal" },
  { id: "W002", date: "2026-03-27", ph: "7.4", chlorine: "2.8", temp: "27", cleaning: "Completed", remarks: "Chlorine slightly high" },
  { id: "W003", date: "2026-03-26", ph: "7.2", chlorine: "2.3", temp: "28", cleaning: "Completed", remarks: "Normal" },
  { id: "W004", date: "2026-03-25", ph: "7.6", chlorine: "3.0", temp: "29", cleaning: "Partial", remarks: "Filter backwash needed" },
  { id: "W005", date: "2026-03-24", ph: "7.1", chlorine: "2.4", temp: "27", cleaning: "Completed", remarks: "Normal" },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

let counter = { member: 9, attendance: 8, payment: 8, staff: 8, water: 6 };

export function AppProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [waterEntries, setWaterEntries] = useState<WaterEntry[]>(initialWater);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  const pushActivity = (name: string, action: string) => {
    setActivityLog(prev => [{ name, action, time: "Just now" }, ...prev.slice(0, 19)]);
  };

  const nextMemberId = () => `M${String(counter.member).padStart(3, "0")}`;
  const nextPaymentId = () => `PAY-${String(counter.payment).padStart(3, "0")}`;
  const nextStaffId = () => `S${String(counter.staff).padStart(3, "0")}`;

  const addMember = (m: Omit<Member, "id">) => {
    const id = nextMemberId();
    counter.member++;
    setMembers(prev => [...prev, { ...m, id }]);
    pushActivity(m.name, "New Registration");
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const addAttendance = (a: Omit<AttendanceRecord, "id">) => {
    const id = `A${String(counter.attendance).padStart(3, "0")}`;
    counter.attendance++;
    setAttendance(prev => [...prev, { ...a, id }]);
    pushActivity(a.name, `Attendance: ${a.status}`);
  };

  const deleteAttendance = (id: string) => {
    setAttendance(prev => prev.filter(a => a.id !== id));
  };

  const addPayment = (p: Omit<Payment, "id">) => {
    const id = nextPaymentId();
    counter.payment++;
    setPayments(prev => [...prev, { ...p, id }]);
    pushActivity(p.name, `Payment ₹${p.amount.toLocaleString()} – ${p.status}`);
  };

  const deletePayment = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  const addStaff = (s: Omit<Staff, "id">) => {
    const id = nextStaffId();
    counter.staff++;
    setStaffList(prev => [...prev, { ...s, id }]);
    pushActivity(s.name, "Staff Added");
  };

  const updateStaff = (id: string, updates: Partial<Staff>) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteStaff = (id: string) => {
    setStaffList(prev => prev.filter(s => s.id !== id));
  };

  const addWaterEntry = (w: Omit<WaterEntry, "id">) => {
    const id = `W${String(counter.water).padStart(3, "0")}`;
    counter.water++;
    setWaterEntries(prev => [{ ...w, id }, ...prev]);
    pushActivity("System", "Water Quality Entry Added");
  };

  const deleteWaterEntry = (id: string) => {
    setWaterEntries(prev => prev.filter(w => w.id !== id));
  };

  return (
    <AppContext.Provider value={{
      members, attendance, payments, staff: staffList, waterEntries, activityLog,
      addMember, updateMember, deleteMember,
      addAttendance, deleteAttendance,
      addPayment, deletePayment,
      addStaff, updateStaff, deleteStaff,
      addWaterEntry, deleteWaterEntry,
      nextMemberId, nextPaymentId, nextStaffId,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppData = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppData must be used within AppProvider");
  return ctx;
};
