import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:true,
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.html',
  imports: [CommonModule]
})
export class MisPedidos implements OnInit {
  pedidosPendientes: any[] = [];
  pedidosAprobados: any[] = [];
  pedidosCancelados: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.authService.usuarioId; // Obtiene el ID del usuario logueado
    if (id) {
      this.ordersService.getMisPedidos(id).subscribe({
        next: (data) => {
          // Clasifica los pedidos por su estado
          this.pedidosPendientes = data.filter((p: any) => p.estado === 'PENDIENTE');
          this.pedidosAprobados = data.filter((p: any) => p.estado === 'APROBADO');
          this.pedidosCancelados = data.filter((p: any) => p.estado === 'CANCELADO');
        },
        error: (err) => {
          console.error('Error al cargar pedidos', err);
        }
      });
    } else {
      console.warn('No hay usuario logueado o no tiene id');
    }
  }

  cancelar(pedidoId: number) {
    this.ordersService.cancelarPedido(pedidoId).subscribe(() => {
      this.pedidosPendientes = this.pedidosPendientes.filter(p => p.id !== pedidoId);
    }, error => {
      console.error('Error al cancelar pedido', error);
    });
  }

  eliminarPedido(id: number) {
    if (confirm('¿Estás seguro que querés eliminar este pedido?')) {
      this.ordersService.eliminarPedido(id).subscribe({
        next: () => {
          this.pedidosAprobados = this.pedidosAprobados.filter(p => p.id !== id);
          this.pedidosCancelados = this.pedidosCancelados.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar pedido:', err);
          alert('No se pudo eliminar el pedido.');
        }
      });
    }
  }
}