import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { Vehicle } from "../interfaces/vehicle.interface";
import { Observable } from "rxjs";
import { CheckTokenResponse } from "../interfaces/check-token.response";


@Injectable({providedIn: 'root'})

export class VehicleService{
    private readonly baseUrl:string = environment.baseUrl;
    constructor (private http: HttpClient){}

    
    registerVehicle(vehicle: Vehicle): Observable<Vehicle> {
        const url = `${this.baseUrl}/settings/registervehicle`;
        const vehicleData = {
            idCompany: vehicle.idCompany|| '',
            brand: vehicle.brand,
            color: vehicle.color || '',
            vehicleModel: vehicle.vehicleModel || '',
            plate: vehicle.plate || '',
            year: vehicle.year || ''
        };    
        return this.http.post<Vehicle>(url, vehicleData, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    getVehiclesByIdComapny(id: string): Observable<any> {
        const url = `${this.baseUrl}/settings/getvehicle/${id}`;
        return this.http.get<any>(url);
    }
    
    updateVehiclesById(id: string,vehicleData: Vehicle): Observable<Vehicle>{
        const url = `${this.baseUrl}/settings/updatevehicle/${id}`;
        return this.http.put<Vehicle>(url,vehicleData);
    }

    deleteVehicle(id: string) {
        const url = `${this.baseUrl}/settings/deletevehicle/${id}`;
        return this.http.delete<{ message: string }>(url);
    }
}

