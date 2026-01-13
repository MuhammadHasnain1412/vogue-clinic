export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string | null;
  time: string | null;
  message: string | null;
  createdAt: string;
}
