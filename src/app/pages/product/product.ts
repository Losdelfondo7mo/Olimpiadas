import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from '../cart/cart';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

     productos = [
    {
      id: 1,
      nombre: 'Paquete al Caribe',
      precio: 1500,
      descripcion: '7 noches en hotel 5★ con vuelos ida y vuelta.',
    },
    {
      id: 2,
      nombre: 'Alojamiento en Bariloche',
      precio: 450,
      descripcion: '3 noches en cabaña para 2 personas.',
    },
    {
      id: 3,
      nombre: 'Alquiler de Auto en Córdoba',
      precio: 250,
      descripcion: 'Auto económico por 5 días.',
    },
    {
      id: 4,
      nombre: 'Pasaje a Mendoza (aéreo)',
      precio: 200,
      descripcion: 'Pasaje ida y vuelta desde Buenos Aires.',
    },
    {
      id: 5,
      nombre: 'Excursión Glaciar Perito Moreno',
      precio: 100,
      descripcion: 'Excursión guiada de día completo.',
    }
  ];
  
  constructor(private cartService: CartService) {}

  agregarAlCarrito(producto: any) {
    this.cartService.agregar(producto);
  }
}
