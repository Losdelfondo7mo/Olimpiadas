import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { UsersService } from '../../services/users.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-estadisticas',
  imports: [CommonModule],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css'
})
export class Estadisticas implements OnInit {

  estadisticasPedidos: any;
  estadisticasUsuarios: any;

  estadisticasPedidosData: any[] = [];
  estadisticasUsuariosData: any[] = [];

  constructor(
    private ordersService: OrdersService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    // estadísticas de pedidos
    this.ordersService.getEstadisticas().subscribe({
      next: (data) => {
        this.estadisticasPedidos = data;
        this.estadisticasPedidosData = [
          { label: 'Total de Pedidos', value: data.total_pedidos, icon: 'bi bi-bag-check' },
          { label: 'Ingresos Totales', value: `$ ${data.ingresos_totales.toFixed(2)}`, icon: 'bi bi-cash-stack' },
          { label: 'Pedido Promedio', value: `$ ${data.pedido_promedio.toFixed(2)}`, icon: 'bi bi-receipt' },
          { label: 'Producto Más Vendido', value: data.producto_mas_vendido || 'Ninguno', icon: 'bi bi-star-fill' },
          { label: 'Pedidos Hoy', value: data.pedidos_hoy, icon: 'bi bi-calendar-check' },
          { label: 'Ingresos Hoy', value: `$ ${data.ingresos_hoy.toFixed(2)}`, icon: 'bi bi-graph-up' }
        ];
      },
      error: (err) => {
        console.error('Error al cargar estadísticas de pedidos', err);
      }
    });

    //estadísticas de usuarios
    this.usersService.getEstadisticasUsuarios().subscribe({
      next: (data) => {
        this.estadisticasUsuarios = data;
        this.estadisticasUsuariosData = [
          { label: 'Total Usuarios', value: data.totalUsuarios ?? 0, icon: 'bi bi-people-fill' },
          { label: 'Usuarios Activos', value: data.usuariosActivos ?? 0, icon: 'bi bi-person-check-fill' },
          { label: 'Usuarios Inactivos', value: data.usuariosInactivos ?? 0, icon: 'bi bi-person-x-fill' }
        ];
      },
      error: (err) => {
        console.error('Error al cargar estadísticas de usuarios', err);
      }
    });
  }
}

