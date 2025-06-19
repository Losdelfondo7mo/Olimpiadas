import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  access_token: string;
  token_type: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://backend-9s6b.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  verificarUsuario(nombreUsuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/verificar/${nombreUsuario}`);
  }

  login(usuario: string, contraseña: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
    usuario,
    contraseña,
  }).pipe(
    tap(respuesta => {
      console.log('Respuesta del login:', respuesta);

      this.guardarSesion(respuesta.access_token);

      if (respuesta.usuario) {
        localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
        console.log('Usuario guardado:', respuesta);
      } else {
        console.warn(' No se recibió el usuario en la respuesta del login');
      }
    })
  );
}
  registrarUsuario(registroData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear`, registroData);
  }

  estaAutenticado(): boolean {
  return !!localStorage.getItem('access_token');
  }


  guardarSesion(token: string): void {
    localStorage.setItem('access_token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('access_token');
  }
//guardar usuario
  get usuarioActual(): string | null {
  const raw = localStorage.getItem('usuario');
  return raw ? JSON.parse(raw) : null;
}



  //cerrar sesión 

  cerrarSesion(): void {
  localStorage.removeItem('usuario');
  localStorage.removeItem('access_token');
}
}
