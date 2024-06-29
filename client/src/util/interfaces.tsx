import { Dayjs } from "dayjs";

export interface Profile {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

export interface Review {
  _id: string;
  name: string;
  comment: string;
  rating: number;
}

export interface Service {
  _id: string;
  name: string;
  duration: number;
}

export interface Branch {
  _id: string;
  name: string;
  services: Service
  location: string;
  openingTime: Date;
  closingTime: Date;
}

export interface Reservation {
  _id: string;
  customerId: string;
  name: string;
  phoneNumber: string;
  branch: string;
  typeOfService: string;
  dateAndTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReservationData {
  name: string;
  phoneNumber: string;
  branch: string;
  typeOfService: string;
  dateAndTime: Dayjs;
}