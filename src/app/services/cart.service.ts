import { Injectable } from '@angular/core';
// @ts-ignore
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imagen?: string;
  cantidad: number; // ← siempre va a tener cantidad
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrito = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carrito.asObservable();

  get currentCart(): Producto[] {
    return this.carrito.getValue();
  }

  agregar(producto: Producto): void {
    const carritoActual = this.currentCart;
    const existe = carritoActual.find(p => p.id === producto.id);

    if (existe) {
      existe.cantidad++;
    } else {
      carritoActual.push({
        ...producto,
        cantidad: 1,
      });
    }

    this.carrito.next([...carritoActual]);
  }

  eliminar(id: number): void {
    const nuevo = this.currentCart.filter(p => p.id !== id);
    this.carrito.next(nuevo);
  }

  vaciar(): void {
    this.carrito.next([]);
  }

  get total(): number {
    return this.currentCart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  pagar(): void {
    alert(`¡Gracias por tu compra de $${this.total}!`);
    this.vaciar();
  }
}
