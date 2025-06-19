import { Injectable } from '@angular/core';
import { Producto } from './cart.service';


export interface Pedido {
  id: number;
  usuario: string;
  productos: Producto[];
  total: number;
  estado: 'pendiente' | 'aprobado' | 'cancelado';
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private pedidos: Pedido[] = [];
  private contadorId = 1;

  constructor() {
    const guardados = localStorage.getItem('pedidos');
    if (guardados) {
      this.pedidos = JSON.parse(guardados);
      this.contadorId = this.pedidos.length + 1;
    }
  }

  agregarPedido(pedido: Omit<Pedido, 'id' | 'estado' | 'fecha'>) {
    const nuevo: Pedido = {
      ...pedido,
      id: this.contadorId++,
      estado: 'pendiente',
      fecha: new Date(),
    };
    this.pedidos.push(nuevo);
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos)); // 👈
    console.log('✅ Pedido guardado en localStorage:', nuevo);
  }

  getPedidos(): Pedido[] {
    return this.pedidos;
  }

  cambiarEstado(id: number, estado: 'aprobado' | 'cancelado') {
    const pedido = this.pedidos.find(p => p.id === id);
    if (pedido) {
      pedido.estado = estado;
      localStorage.setItem('pedidos', JSON.stringify(this.pedidos)); // 👈 actualizar storage
    }
  }
}