import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-estadisticas',
  imports: [CommonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export class Estadisticas implements OnInit {

  estadisticas: any;
  estadisticasData: any[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getEstadisticas().subscribe({
      next: (data) => {
        this.estadisticas = data;

        // Construcción del array para el *ngFor del HTML
        this.estadisticasData = [
          {
            label: 'Total de Pedidos',
            value: data.total_pedidos,
            icon: 'bi bi-bag-check'
          },
          {
            label: 'Ingresos Totales',
            value: `$ ${data.ingresos_totales.toFixed(2)}`,
            icon: 'bi bi-cash-stack'
          },
          {
            label: 'Pedido Promedio',
            value: `$ ${data.pedido_promedio.toFixed(2)}`,
            icon: 'bi bi-receipt'
          },
          {
            label: 'Producto Más Vendido',
            value: data.producto_mas_vendido || 'Ninguno',
            icon: 'bi bi-star-fill'
          },
          {
            label: 'Pedidos Hoy',
            value: data.pedidos_hoy,
            icon: 'bi bi-calendar-check'
          },
          {
            label: 'Ingresos Hoy',
            value: `$ ${data.ingresos_hoy.toFixed(2)}`,
            icon: 'bi bi-graph-up'
          }
        ];
      },
      error: (err) => {
        console.error('Error al cargar estadísticas', err);
      }
    });
  }
}
