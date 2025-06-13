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
    {
      id: 1,
      nombre: 'Paquete al Caribe',
      precio: 1500,
      descripcion: '7 noches en hotel 5★ con vuelos ida y vuelta.',
      imagen: 'https://i.pinimg.com/736x/50/84/68/5084680df82f323ae4a4aa6466cc80bd.jpg'
    },
    {
      id: 2,
      nombre: 'Alojamiento en Bariloche',
      precio: 450,
      descripcion: '3 noches en cabaña para 2 personas.',
      imagen: 'https://i.pinimg.com/736x/14/64/91/14649129eb5aad067e08004b45cff564.jpg'
    },
    {
      id: 3,
      nombre: 'Alquiler de Auto en Córdoba',
      precio: 250,
      descripcion: 'Auto económico por 5 días.',
      imagen: 'https://i.pinimg.com/736x/26/3d/61/263d61497b9ad885e842abb711056846.jpg'
    },
    {
      id: 4,
      nombre: 'Pasaje a Mendoza (aéreo)',
      precio: 200,
      descripcion: 'Pasaje ida y vuelta desde Buenos Aires.',
      imagen: 'https://i.pinimg.com/736x/21/e8/70/21e8701566b7260122e99c76056ccf97.jpg'
    },
    {
      id: 5,
      nombre: 'Excursión Glaciar Perito Moreno',
      precio: 100,
      descripcion: 'Excursión guiada de día completo.',
      imagen: 'https://i.pinimg.com/736x/42/c3/02/42c302be62859b24c9a47094a083916a.jpg'
    }
  ];

  carrito: {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }[] = [];

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


