import { User } from '../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs/internal/Observable';
import { CheckTokenResponse } from '../interfaces/check-token.response';

@Injectable({providedIn: 'root'})

export class UserService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<CheckTokenResponse> {
    const url = `${this.baseUrl}/auth/register`;
  
    const userData = {
      email: user.email,
      name: user.name || '',
      password: user.password || '',
      roles: Array.isArray(user.roles) ? user.roles : [user.roles],
      company: user.company || '',
      status: user.isActive || false
    };    
    return this.http.post<CheckTokenResponse>(url, userData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getUsersByIdComapny(id: string): Observable<any> {
    const url = `${this.baseUrl}/auth/users/${id}`;
    return this.http.get<any>(url);
  }  

  updateUser(userData: User) {
    const url = `${this.baseUrl}/auth/update/${userData.id}`;
    return this.http.put<User>(url, userData);
  }

  deleteUser(id: string) {
    const url = `${this.baseUrl}/auth/delete/${id}`;
    return this.http.delete<{ message: string }>(url);
  }
}
