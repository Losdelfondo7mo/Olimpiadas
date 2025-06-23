import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.html',
  imports: [CommonModule]
})
export class MisPedidos implements OnInit {
  pedidos: any[] = [];

  constructor(private orderssService: OrdersService) {}

  ngOnInit() {
  const usuarioId = 4; // Obtenelo según tu lógica (ej: de sesión, localStorage, etc.)
  this.orderssService.getMisPedidos(usuarioId).subscribe({
    next: (data) => {
      this.pedidos = data;
    },
    error: (err) => {
      console.error('Error al cargar pedidos', err);
    }
  });
}


  cancelar(pedidoId: number) {
  this.orderssService.cancelarPedido(pedidoId).subscribe(() => {
    this.pedidos = this.pedidos.filter(p => p.id !== pedidoId);
  }, error => {
    console.error('Error al cancelar pedido', error);
  });
}
}
