export interface PatientDetailOfTodayBooking {
  id: number;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  gender: string;
  HKID: string;
  phone: string;
  birthday: any;
  time: string;
}

export interface DietitianPatientPanel {
  id: number;
  first_name: string;
  last_name: string;
  height: number;
  weight: number;
  gender: number | string;
  HKID: string;
  phone: string;
  birthday: any;
}

export interface UserBookingData {
  id: number;
  date: string;
  first_name: string;
  last_name: string;
  time: string;
}

export interface UserBookingDetailByDateAndDietitian {
  id: number;
  date: string;
  time: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  users_id: number;
  dietitian_id: number;
}

export interface WeightDetail {
  id: number;
  date: string;
  weight: number;
}
export interface BPDetail {
  id: number;
  date: string;
  sys_bp: number;
  dia_bp: number;
  time: string;
}

export interface BGDetail {
  id: number;
  date: string;
  bg_measurement: number;
  time: string;
}

export interface UserDetailInDietiainPanel {
  id: number;
  first_name: string;
  last_name: string;
  birthday: string;
  height: number;
  weight: number;
  gender: number;
  phone: string;
  hkid: string;
}

export interface token {
  id: number;
  username: string;
}
