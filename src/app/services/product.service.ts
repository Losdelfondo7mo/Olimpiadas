import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  private contadorId = 1;

  constructor() {
    const guardados = localStorage.getItem('productos');
    const productosIniciales = guardados ? JSON.parse(guardados) : this.productosBase();
    this.productosSubject.next(productosIniciales);
    this.contadorId = productosIniciales.length + 1;
  }

    private productosBase(): Producto[] {
    return [
    { id: 1, nombre: 'Paquete al Caribe', precio: 1500, descripcion: '7 noches en hotel 5★ con vuelos ida y vuelta.' },
    { id: 2, nombre: 'Alojamiento en Bariloche', precio: 450, descripcion: '3 noches en cabaña para 2 personas.' },
    { id: 3, nombre: 'Alquiler de Auto en Córdoba', precio: 250, descripcion: 'Auto económico por 5 días.' },
    { id: 4, nombre: 'Pasaje a Mendoza (aéreo)', precio: 200, descripcion: 'Pasaje ida y vuelta desde Buenos Aires.' },
    { id: 5, nombre: 'Excursión Glaciar Perito Moreno', precio: 100, descripcion: 'Excursión guiada de día completo.' }
  ];
}

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  agregarProducto(producto: Omit<Producto, 'id'>) {
    const productos = this.productosSubject.value;
    const nuevo: Producto = { id: this.contadorId++, ...producto };
    const actualizados = [...productos, nuevo];
    this.productosSubject.next(actualizados);
    localStorage.setItem('productos', JSON.stringify(actualizados));
  }
}
