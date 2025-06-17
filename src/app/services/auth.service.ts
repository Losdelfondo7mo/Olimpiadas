import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginRequest } from '../auth/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(credenciales: LoginRequest): Observable<any>{
    return this.http.post('http://localhost:8000/api/login', credenciales)
  }
}
