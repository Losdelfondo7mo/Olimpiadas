import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


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
export class CartService {
  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();

  get currentCart() {
    return this.carrito.getValue();
  }

  agregar(producto: any) {
    const carritoActual = this.currentCart;
    const existe = carritoActual.find(p => p.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio, 
        cantidad: 1
      });
    }
  this.carrito.next([...carritoActual]);
}

  eliminar(id: number) {
    const nuevo = this.currentCart.filter(p => p.id !== id);
    this.carrito.next(nuevo);
  }

  vaciar() {
    this.carrito.next([]);
  }

  get total(): number {
    return this.currentCart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  pagar() {
    this.vaciar();
  }

}