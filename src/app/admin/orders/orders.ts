import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService, Pedido } from '../../services/orders.service';

@Component({
  selector: 'app-admin-orders',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class AdimnOrders implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.pedidos = this.ordersService.getPedidos();
    console.log('📦 Pedidos cargados en admin:', this.pedidos);
  }

  cambiarEstado(id: number, estado: 'aprobado' | 'cancelado') {
  this.ordersService.cambiarEstado(id, estado);
  // refrescar pedidos
  this.pedidos = this.ordersService.getPedidos();
}

}