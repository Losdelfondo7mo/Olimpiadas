import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule ],
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

  constructor(public cartService: CartService) {}

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
    this.cartService.pagar();
  }

  get total() {
    return this.cartService.total;
  }
}


