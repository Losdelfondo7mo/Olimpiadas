import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Administrador {
  id?: number;
  usuario: string;
  nombre: string;
  apellido:string;
  email: string;
  password: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  private baseUrl = 'https://backend-9s6b.onrender.com/api/usuarios'

  constructor(private http: HttpClient) { }

  listarAdministradores(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${this.baseUrl}/administradores`);
  }

  crearAdministrador(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.baseUrl}/crear-administrador`, admin);
  }
}
