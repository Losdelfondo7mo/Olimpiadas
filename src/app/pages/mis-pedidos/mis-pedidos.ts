import { Component, OnInit } from '@angular/core'; // Agregar imports faltantes
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.html',
  imports: [CommonModule]
})
export class MisPedidos implements OnInit {
  pedidosPendientes: any[] = [];
  pedidosAprobados: any[] = [];
  // Eliminado: pedidosCancelados para ocultar en vista de usuario

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.authService.usuarioId;
    if (id) {
      this.loadPedidos();
    } else {
      console.warn('No hay usuario logueado o no tiene id');
    }
  }

  loadPedidos() {
    this.ordersService.getTodosPedidos().subscribe({
      next: (data: any[]) => {
        this.pedidosPendientes = data?.filter((p: any) => p.estado === 'PENDIENTE') || [];
        this.pedidosAprobados = data?.filter((p: any) => p.estado === 'CONFIRMADO') || [];
        // No cargamos pedidos cancelados en vista de usuario
      },
      error: (err: any) => {
        console.error('Error al cargar pedidos', err);
      }
    });
  }

  cancelar(pedidoId: number) {
    this.ordersService.cancelarPedido(pedidoId).subscribe({
      next: () => {
        this.pedidosPendientes = this.pedidosPendientes.filter(p => p.id !== pedidoId);
      },
      error: (error: any) => {
        console.error('Error al cancelar pedido', error);
      }
    });
  }

  // Método eliminarPedido eliminado - solo disponible en admin
}