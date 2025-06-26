import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-fallido',
  templateUrl: './pago-fallido.html',
  styleUrls: ['./pago-fallido.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PagoFallido implements OnInit {
  pedidoId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pedidoId = +params['pedidoId'];
      console.log('Pago fallido para el pedido:', this.pedidoId);
    });
  }
  
  volverAlCarrito(): void {
    this.router.navigate(['/cart']);
  }
}