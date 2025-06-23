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

  constructor(private ordersService: OrdersService, private authService: AuthService, private productsService: ProductService) {
  }

  pendientes: Pedido[] = [];
  productosMap = new Map<number, any>();  // Mapa producto_id -> datos del producto

    ngOnInit() {
      this.ordersService.getPendientes().subscribe(data => {
      this.pendientes = data;
    });
  }

  confirmar(id: number) {
    this.ordersService.confirmarPedido(id).subscribe(() => {
      this.pendientes = this.pendientes.filter((p: Pedido) => p.id !== id);
    });
  }

  cancelar(id: number) {
    this.ordersService.cancelarPedido(id).subscribe(() => {
      this.pendientes = this.pendientes.filter((p: Pedido) => p.id !== id);
    });
  }
}

