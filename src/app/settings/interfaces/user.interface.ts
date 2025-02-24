import { Vehicle } from "./vehicle.interface";

export interface User {
    id?: string;
    email: string;
    name: string;
    password?: string;
    isActive: boolean;
    roles:    string[];
    company: string; 
    vehicles: Vehicle[];
    activeDevice: string;
  }