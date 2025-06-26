import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService, MercadoPagoPreference, ProductoItem, PedidoCrear } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements OnInit {
  preferenceId: string | null = null;
  carrito: any[] = [];
  
  constructor(private cartService: CartService, private ordersService: OrdersService) {}
  
  ngOnInit(): void {
    // Initialize carrito from CartService
    this.cartService.carrito$.subscribe(items => {
      this.carrito = items;
    });
  }
  
  // Add this method to empty the cart
  vaciar(): void {
    this.cartService.vaciar();
    this.mostrarToast('Carrito vaciado', 'success');
  }
  
  // Add this method to show toast messages
  mostrarToast(message: string, type: string): void {
    console.log(message); // Replace with your toast implementation
  }
  
  // Add this method to calculate total
  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
  
  // Modify the pagar method
  pagar() {
    if (this.carrito.length === 0) {
      this.mostrarToast('No hay productos en el carrito', 'error');
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const productos: ProductoItem[] = this.carrito.map(item => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad
    }));

    const pedido: PedidoCrear = {
      productos,
      total: this.calcularTotal(),
      usuario_id: usuario.id,
      usuario: usuario.username
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
            this.mostrarToast('Error al procesar el pago', 'error');
          }
        });
      },
      error: (error) => {
        console.error('Error adding order:', error);
        this.mostrarToast('Error al agregar el pedido', 'error');
      }
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