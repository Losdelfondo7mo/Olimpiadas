import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService, Pedido } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class AdminOrders implements OnInit {
  pendientes: Pedido[] = [];
  aprobados: Pedido[] = [];
  cancelados: Pedido[] = [];

  productosMap = new Map<number, any>();

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductService
  ) {}

  ngOnInit() {
  this.ordersService.getPendientes().subscribe({
    next: (data: Pedido[]) => {
      this.pendientes = data.filter(p => p.estado === 'PENDIENTE');
      this.aprobados = data.filter(p => p.estado === 'APROBADO');
      this.cancelados = data.filter(p => p.estado === 'CANCELADO');
    },
    error: (err) => {
      console.error('Error al cargar pedidos', err);
    }
  });
}

loadPedidos() {
  this.ordersService.getTodosPedidos().subscribe({
    next: (data) => {
      console.log('Pedidos cargados:', data); 

      this.pendientes = data.filter(p => p.estado === 'PENDIENTE');
      this.aprobados = data.filter(p => p.estado === 'APROBADO');
      this.cancelados = data.filter(p => p.estado === 'CANCELADO');
    },
    error: (err) => {
      console.error('Error al cargar pedidos:', err);
    }
  });
}

  confirmar(id: number) {
  const pedido = this.pendientes.find(p => p.id === id);
  if (pedido && pedido.detalles.length > 0) {
    const producto_id = pedido.detalles[0].producto_id;
    this.ordersService.confirmarPedido(pedido.id, producto_id).subscribe({
      next: () => {
        this.loadPedidos(); 
      },
      error: err => {
        console.error('Error al confirmar pedido:', err);
      }
    });
  }
}

cancelar(id: number) {
  this.ordersService.cancelarPedido(id).subscribe(() => {
    this.loadPedidos(); 
  });
}
}

