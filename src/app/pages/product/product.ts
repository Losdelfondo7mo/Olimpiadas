import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Producto, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductService, private cartService: CartService) {}

    ngOnInit() {
      this.productosService.getProductos().subscribe(data => {
        this.productos = data;
      });
    }

  agregarAlCarrito(producto: Producto) {
    this.cartService.agregar(producto);
  }
}
