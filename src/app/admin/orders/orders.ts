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
    private authService: AuthService,
    private productsService: ProductService
  ) {}

  ngOnInit() {
    this.ordersService.getPendientes().subscribe((data: Pedido[]) => {
      this.pendientes = data.filter((p: Pedido) => p.estado === 'PENDIENTE');
      this.aprobados = data.filter((p: Pedido) => p.estado === 'APROBADO');
      this.cancelados = data.filter((p: Pedido) => p.estado === 'CANCELADO');
    });

    // Usa el método correcto que tengas definido en tu servicio
    this.productsService.getProductos().subscribe((productos: any[]) => {
      productos.forEach((p: any) => this.productosMap.set(p.id, p));
    });
  }

  confirmar(id: number) {
  console.log('Confirmando pedido con ID:', id);
  this.ordersService.confirmarPedido(id).subscribe({
    next: () => {
      const pedido = this.pendientes.find(p => p.id === id);
      if (pedido) {
        this.aprobados.push(pedido);
        this.pendientes = this.pendientes.filter(p => p.id !== id);
      }
    },
    error: err => {
      console.error('Error al confirmar pedido:', err);
    }
  });
}


  cancelar(id: number) {
    this.ordersService.cancelarPedido(id).subscribe(() => {
      const pedido = this.pendientes.find(p => p.id === id);
      if (pedido) {
        this.cancelados.push(pedido);
        this.pendientes = this.pendientes.filter(p => p.id !== id);
      }
    });
  }
}

