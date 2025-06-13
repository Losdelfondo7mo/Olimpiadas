import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  productos = [
    { id: 1, nombre: 'Camisa Azul', precio: 29.99 },
    { id: 2, nombre: 'Zapatillas Negras', precio: 89.99 },
    { id: 3, nombre: 'Pantalón Jeans', precio: 59.99 }
  ];

  carrito: { id: number; nombre: string; precio: number; cantidad: number }[] = [];

  agregarAlCarrito(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (!producto) return;

    const existe = this.carrito.find(item => item.id === id);
    if (existe) {
      existe.cantidad++;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  eliminarDelCarrito(id: number) {
    this.carrito = this.carrito.filter(item => item.id !== id);
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  get total(): number {
    return this.carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }

  pagar() {
  if (this.carrito.length === 0) return;

  const confirmado = window.confirm(`¿Deseas realizar el pago por $${this.total.toFixed(2)}?`);
  if (confirmado) {
    alert('¡Gracias por tu compra!');
    this.vaciarCarrito();
  }
}
}

