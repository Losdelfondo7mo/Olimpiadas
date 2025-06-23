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

  const pedido = {
    usuario_id: usuario.id,
    usuario: this.authService.usuarioActual || 'N/A',
    monto_total: this.cartService.total,
    detalles: this.cartService.currentCart.map(p => ({
    producto_id: p.id,
    cantidad: p.cantidad,
    precio_unitario: p.precio
  })),
    productos: this.cartService.currentCart,
    total: this.cartService.total
  };

  this.ordersService.agregarPedido(pedido).subscribe({
    next: () => {
      this.cartService.pagar();
      this.mostrarToast('¡Compra realizada con éxito!');
      
    },
    error: err => console.error('Error al guardar el pedido:', err.error?.detail || err)
  });
}




}