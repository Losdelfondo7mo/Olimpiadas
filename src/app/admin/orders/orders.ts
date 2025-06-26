import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  // Eliminar esta línea
  // sinPendientes = true;

  productosMap = new Map<number, any>();

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductService
  ) {}

  ngOnInit() {
    this.loadPedidos();
  }
  
  loadPedidos() {
    this.ordersService.getTodosPedidos().subscribe({
      next: (data: Pedido[]) => {
        this.pendientes = data?.filter(p => p.estado === 'PENDIENTE') || [];
        this.aprobados = data?.filter(p => p.estado === 'CONFIRMADO') || []; // Cambiar APROBADO por CONFIRMADO
        this.cancelados = data?.filter(p => p.estado === 'CANCELADO') || [];
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos:', err);
      }
    });
}
  
  confirmar(id: number) {
    const pedido = this.pendientes.find(p => p.id === id);
    if (pedido) {
      this.ordersService.confirmarPedido(pedido.id).subscribe({
        next: () => this.loadPedidos(),
        error: err => console.error('Error al confirmar pedido:', err)
      });
    }
  }
  
  cancelar(id: number) {
    this.ordersService.cancelarPedido(id).subscribe(() => {
      this.loadPedidos(); 
    });
  }
  
  eliminarPedido(id: number) {
    if (confirm('¿Estás seguro que querés eliminar este pedido?')) {
      this.ordersService.eliminarPedido(id).subscribe({
        next: () => {
          this.aprobados = this.aprobados.filter(p => p.id !== id);
          this.cancelados = this.cancelados.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar pedido:', err);
          alert('No se pudo eliminar el pedido.');
        }
      });
    }
  }
}

