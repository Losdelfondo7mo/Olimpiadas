import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Add this import

export interface DetallePedido {
  id?: number;
  pedido_id?: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}

export interface Pedido {
  id: number;
  n_pedido: string; // Added n_pedido
  usuario_id: number | null;
  monto_total: number;
  fecha: string;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO' | 'DENEGADO' | 'ENTREGADO';
  productos: any[];
  detalles?: any[];
}

export interface PedidoCrear {
  productos: ProductoItem[];
  total?: number;
  usuario_id?: number;
  usuario?: string;
}

export interface ProductoItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// Add this interface
export interface MercadoPagoPreference {
  id: string;
  init_point: string;
  sandbox_init_point: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://backend-9s6b.onrender.com/api/pedidos';

  constructor(private http: HttpClient, private authService: AuthService) {} // Add AuthService injection

  agregarPedido(pedido: PedidoCrear): Observable<any> {
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

    console.log('Cancelando pedido →', {
      url: `${this.baseUrl}/cancelar/${pedidoId}`,
      headers,
      body: {}
    });

    return this.http.put(`${this.baseUrl}/cancelar/${pedidoId}`, {}, { headers });
  }

  getTodosPedidos(): Observable<Pedido[]> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Pedido[]>(`${this.baseUrl}/todos`, { headers });
  }

  confirmarPedido(pedidoId: number): Observable<any> {
    const token = localStorage.getItem('access_token')!;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    console.log('Confirmando pedido →', {
      url: `${this.baseUrl}/confirmar/${pedidoId}`,
      headers,
      body: { confirmar: true }
    });

    return this.http.put(`${this.baseUrl}/confirmar/${pedidoId}`, { confirmar: true }, { headers });
  }

  getPendientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pendientes`);
  }

  getEstadisticas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estadisticas`);
  }

  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Add this method
  crearPreferenciaPago(pedidoId: number): Observable<MercadoPagoPreference> {
    const url = `${this.baseUrl}/crear-preferencia/${pedidoId}`;
    return this.http.post<MercadoPagoPreference>(url, {}, {
      headers: {
        'Authorization': `Bearer ${this.authService.obtenerToken()}`
      },
      withCredentials: true
    });
  }
}