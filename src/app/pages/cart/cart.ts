import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../product/product';
import { OrdersService } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
  })
  export class Cart {

  toastVisible = false;
  toastMensaje = '';

  mostrarToast(mensaje: string) {
  this.toastMensaje = mensaje;
  this.toastVisible = true;

  setTimeout(() => {
    this.toastVisible = false;
  }, 3500);
  }


  carrito: {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    imagen: string;
    cantidad: number;
  }[] = [];

  constructor(public cartService: CartService, private ordersService: OrdersService, private authService:AuthService) {}

  ngOnInit(): void {
    this.cartService.carrito$.subscribe(carrito => {
      this.carrito = carrito;
    });
  }

  eliminar(id: number) {
  const eliminado = this.carrito.find(p => p.id === id);
  this.cartService.eliminar(id);
  if (eliminado) {
    this.mostrarToast(`Se eliminó "${eliminado.nombre}" del carrito `);
  }
  }

  vaciar() {
  this.cartService.vaciar();
  this.mostrarToast('Se vació el carrito ');
  }
  
  get total(): number {
  return this.cartService.total;
  }



  pagar() {
  const usuarioStr = localStorage.getItem('usuario');
  if (!usuarioStr) {
    console.error('No hay usuario en localStorage');
    return;
  }

  const usuario = JSON.parse(usuarioStr);
  
  // Add null check for usuarioId
  const usuarioId = this.authService.usuarioId;
  if (!usuarioId) {
    console.error('Usuario no autenticado');
    this.mostrarToast('Error: Usuario no autenticado');
    return;
  }

  // Fix the pedido object to match backend schema
  const pedido = {
    productos: this.cartService.currentCart.map(p => ({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: p.cantidad
    })),
    total: this.cartService.total,
    usuario_id: usuarioId,
    usuario: this.authService.usuarioCompleto?.nombre || this.authService.usuarioCompleto?.email
  };
  
  this.ordersService.agregarPedido(pedido).subscribe({
    next: () => {
      this.cartService.pagar();
      this.mostrarToast('¡Compra realizada con éxito!');
    },
    error: (err: any) => console.error('Error al guardar el pedido:', err.error?.detail || err)
  });
}




}