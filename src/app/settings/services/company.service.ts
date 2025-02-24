import { Company } from './../interfaces/company.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registerCompany(company: Company ,file:File,id:string): Observable<Company> {
    const url = `${this.baseUrl}/settings/registercompany`;

    // Crea un objeto FormData
    const formData = new FormData();
    formData.append('name', company.name);
    formData.append('address', company.address || '');
    formData.append('phone', company.phone || '');
    formData.append('idUser', id || '');

    // Añade el archivo solo si está presente
    if (file) {
      formData.append('logo', file, file.name);
    }

    // Envía la solicitud POST
    return this.http.post<Company>(url, formData);
  }

  updateCompany(company: Company ,file:File): Observable<Company> {
    const url = `${this.baseUrl}/settings/updatecompany`;
    // Crea un objeto FormData
    const formData = new FormData();
    if(company._id)
      formData.append('_id', company._id);
    if(company.name !== '')
      formData.append('name', company.name);
    if(company.address !== '')
      formData.append('address', company.address || '');
    if(company.phone !== '')
      formData.append('phone', company.phone || '');

    // Añade el archivo solo si está presente
    if (file) {
      formData.append('logo', file, file.name);
    }
    return this.http.post<Company>(url, formData);
  }

  getCompanyById(id: string): Observable<any> {
    const url = `${this.baseUrl}/settings/getcompany/${id}`;
    return this.http.get<any>(url);
  }

  getLogoById(id: string): Observable<any> {
    const url = `${this.baseUrl}/settings/getcompany/${id}/logo`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
