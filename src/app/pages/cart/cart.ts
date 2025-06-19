import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../product/product';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {


  carrito: {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    cantidad: number;
  }[] = [];

  constructor(public cartService: CartService, private ordersService: OrdersService, private authService:AuthService) {}

  ngOnInit(): void {
    this.cartService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  eliminar(id: number) {
    this.cartService.eliminar(id);
  }

  vaciar() {
    this.cartService.vaciar();
  }

  pagar() {
  this.ordersService.agregarPedido({
    usuario: this.authService.usuarioActual || 'invitado',
    productos: this.carrito,
    total: this.cartService.total,
  });

  this.cartService.pagar();
}


  get total() {
    return this.cartService.total;
  }

  finalizarCompra() {
  this.ordersService.agregarPedido({
    usuario: this.authService.usuarioActual || 'invitado',
    productos: this.carrito,
    total: this.cartService.total,
  });

  console.log('Pedido agregado como invitado');
}
}


