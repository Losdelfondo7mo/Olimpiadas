import { Component, OnInit} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../pages/product/product';
import { Cart } from '../../pages/cart/cart';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterModule,CommonModule, ],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav {

    constructor(public authService: AuthService, private router: Router) {}

    irAlPerfil(): void {
    this.router.navigate(['/perfil']);
    }
}

