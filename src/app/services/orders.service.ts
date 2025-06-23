import { Injectable } from '@angular/core';
import { Producto } from './cart.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface DetallePedido {
  id?: number;
  pedido_id?: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}

export interface Pedido {
  id: number;
  n_pedido?: string;
  usuario: string;
  productos?: Producto[];
  total: number;
  monto_total: number;
  estado: 'PENDIENTE' | 'APROBADO' | 'CANCELADO';
  fecha: Date;
  usuario_id: number
  detalles: DetallePedido[]
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
  getMisPedidos(usuarioId: number, skip = 0, limit = 100): Observable<Pedido[]> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    let params = new HttpParams()
      .set('usuario_id', usuarioId.toString())
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    return this.http.get<Pedido[]>(`${this.baseUrl}/mis-pedidos`, { headers, params });
  }

  cancelarPedido(pedidoId: number): Observable<any> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.baseUrl}/cancelar/${pedidoId}`, {}, { headers });
  }

 getTodosPedidos(): Observable<Pedido[]> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Pedido[]>(`${this.baseUrl}`, { headers });
  }


 confirmarPedido(pedidoId: number, producto_id: number): Observable<any> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(
      `${this.baseUrl}/confirmar/${pedidoId}`,
      { producto_id },
      { headers }
    );
  }


  getPendientes(): Observable<any> {
  return this.http.get(`${this.baseUrl}/pendientes`);
}








  getEstadisticas(): Observable<any> {
  return this.http.get(`${this.baseUrl}/estadisticas`);
}
  

}