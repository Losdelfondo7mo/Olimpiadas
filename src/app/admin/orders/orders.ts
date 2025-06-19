import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService, Pedido } from '../../services/orders.service';


@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class AdminOrders implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.pedidos = this.ordersService.getPedidos();
  }

  get pendientes(): Pedido[] {
    return this.pedidos.filter(p => p.estado === 'pendiente');
  }

  get aprobados(): Pedido[] {
    return this.pedidos.filter(p => p.estado === 'aprobado');
  }

  get cancelados(): Pedido[] {
    return this.pedidos.filter(p => p.estado === 'cancelado');
  }

  cambiarEstado(id: number, estado: 'aprobado' | 'cancelado') {
    this.ordersService.cambiarEstado(id, estado);
    this.pedidos = this.ordersService.getPedidos();
  }
}

