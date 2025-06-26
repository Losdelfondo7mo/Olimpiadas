import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.html',
  styleUrls: ['./pago-exitoso.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PagoExitoso implements OnInit {
  pedidoId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = +params['pedidoId'];
      console.log('Pago exitoso para el pedido:', this.pedidoId);
    });
  }
  
  volverAInicio(): void {
    this.router.navigate(['/productos']);
  }
}