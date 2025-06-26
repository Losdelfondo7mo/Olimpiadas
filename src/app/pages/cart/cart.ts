import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../product/product';
import { OrdersService, MercadoPagoPreference } from '../../services/orders.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  toastVisible = false;
  toastMensaje = '';
  preferenceId: string | null = null;

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
      next: (response) => {
        // Get the pedido ID from the response
        const pedidoId = response.id;
        
        // Create a payment preference
        this.ordersService.crearPreferenciaPago(pedidoId).subscribe({
          next: (preference: MercadoPagoPreference) => {
            // Initialize Mercado Pago checkout
            this.initMercadoPago(preference);
          },
          error: (error) => {
            console.error('Error creating payment preference:', error);
            this.mostrarToast('Error al procesar el pago');
          }
        });
      },
      error: (err: any) => console.error('Error al guardar el pedido:', err.error?.detail || err)
    });
  }

  // Add this method to initialize Mercado Pago
  initMercadoPago(preference: MercadoPagoPreference) {
    // Store the preference ID
    this.preferenceId = preference.id;
    
    // Clear the cart
    this.cartService.vaciar();
    
    // Add logging
    console.log('Redirecting to Mercado Pago:', preference.init_point);
    
    // Redirect to Mercado Pago checkout
    // Para producción usar init_point, para desarrollo usar sandbox_init_point
    const isProduction = window.location.hostname === 'los-del-fondo-7mo.web.app';
    window.location.href = isProduction ? preference.init_point : preference.sandbox_init_point;
  }
}