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

    toastVisible = false;
    toastMensaje = '';

    mostrarToast(mensaje: string) {
      this.toastMensaje = mensaje;
      this.toastVisible = true;

      setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    }

   productosPorCategoria: { [categoria: string]: Producto[] } = {};

ngOnInit() { 
  this.productosService.getProductos().subscribe(data => {
    this.productos = data;

    // Agrupar productos por categoría
    this.productosPorCategoria = this.productos.reduce((acc, producto) => {
      if (!acc[producto.categoria]) {
        acc[producto.categoria] = [];
      }
      acc[producto.categoria].push(producto);
      return acc;
    }, {} as { [categoria: string]: Producto[] });
  });
}

  get categorias(): string[] {
  return Object.keys(this.productosPorCategoria);
}

    agregarAlCarrito(producto: Producto) {
    this.cartService.agregar(producto);
    this.mostrarToast(`"${producto.nombre}" fue agregado al carrito `);
  }

  eliminar(productoId: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.eliminarProducto(productoId).subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== productoId);
      }, error => {
        console.error('Error al eliminar el producto', error);
      });
    }
  }
}
