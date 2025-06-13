import { Injectable } from '@angular/core';


export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen?: string;
  cantidad?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Producto[] = [];

  // 🔄 Devuelve una copia del carrito actual
  obtenerCarrito(): Producto[] {
    return [...this.carrito];
  }

  // ➕ Agrega producto al carrito
  agregarAlCarrito(producto: Producto): void {
    const item = this.carrito.find(p => p.id === producto.id);
    if (item) {
      item.cantidad! += 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
  }

  // ➖ Elimina un producto por ID
  eliminarDelCarrito(id: number): void {
    this.carrito = this.carrito.filter(item => item.id !== id);
  }

  // 🧹 Limpia todo
  vaciarCarrito(): void {
    this.carrito = [];
  }

  // 💲 Total a pagar
  get total(): number {
    return this.carrito.reduce((sum, item) => sum + item.precio * (item.cantidad || 1), 0);
  }

  // 💳 Simula el pago
  pagar(): void {
    if (this.carrito.length === 0) return;

    const confirmado = window.confirm(`¿Deseas realizar el pago por $${this.total.toFixed(2)}?`);
    if (confirmado) {
      alert('¡Gracias por tu compra!');
      this.vaciarCarrito();
    }
  }
}
