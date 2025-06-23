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

    this.productsService.getProductos().subscribe((productos: any[]) => {
      productos.forEach((p: any) => this.productosMap.set(p.id, p));
    });
  }

  confirmar(id: number) {
  const pedido = this.pendientes.find(p => p.id === id);
  if (pedido && pedido.detalles.length > 0) {
    const producto_id = pedido.detalles[0].producto_id; // o iterar si hay más
    this.ordersService.confirmarPedido(pedido.id, producto_id).subscribe({
      next: () => {
        this.aprobados.push(pedido);
        this.pendientes = this.pendientes.filter(p => p.id !== id);
      },
      error: err => {
        console.error('Error al confirmar pedido:', err);
        if (err.error) {
          console.error('Detalles del backend:', err.error);
        }
      }
    });
  } else {
    console.warn('Pedido no encontrado o sin detalles para confirmar');
  }
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
