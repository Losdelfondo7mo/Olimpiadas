import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-pendiente',
  templateUrl: './pago-pendiente.html',
  styleUrls: ['./pago-pendiente.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PagoPendiente implements OnInit {
  pedidoId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = +params['pedidoId'];
      console.log('Pago pendiente para el pedido:', this.pedidoId);
    });
  }
  
  verMisPedidos(): void {
    this.router.navigate(['/mis-pedidos']);
  }
}