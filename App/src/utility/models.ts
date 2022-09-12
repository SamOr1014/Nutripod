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
  gender: string;
  HKID: string;
  phone: string;
  birthday: any;
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
