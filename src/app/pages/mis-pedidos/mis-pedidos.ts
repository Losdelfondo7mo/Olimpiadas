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
    this.orderssService.getMisPedidos().subscribe(data => {
      this.pedidos = data;
    });
  }

  cancelar(pedidoId: number) {
    this.orderssService.cancelarPedido(pedidoId).subscribe(() => {
      this.pedidos = this.pedidos.filter(p => p.id !== pedidoId);
    });
  }
}
