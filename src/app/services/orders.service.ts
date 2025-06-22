import { Injectable } from '@angular/core';
import { Producto } from './cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Pedido {
  id: number;
  usuario: string;
  productos: Producto[];
  total: number;
  estado: 'pendiente' | 'aprobado' | 'cancelado';
  fecha: Date;
  usuario_id: number
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private pedidos: Pedido[] = [];
  private contadorId = 1;

  private baseUrl = 'https://backend-9s6b.onrender.com/api/pedidos';

  constructor(private http: HttpClient) {
    
    // lo que tengo creado primero sin back
    const guardados = localStorage.getItem('pedidos');
    if (guardados) {
      this.pedidos = JSON.parse(guardados);
      this.contadorId = this.pedidos.length + 1;
    }
  }

  // conexion con el backend 

  agregarPedido(pedido: Omit<Pedido, 'id' | 'estado' | 'fecha'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/crear`, pedido);


  
}


  getMisPedidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mis-pedidos`);
  }

  cancelarPedido(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/cancelar/${id}`, {});
  }

  getPendientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pendientes`);
  }

  confirmarPedido(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/confirmar/${id}`, {});
  }



  //lo viego sin back


  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  cambiarEstado(id: number, estado: 'aprobado' | 'cancelado') {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.estado = estado;
      localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
    }
  }
}