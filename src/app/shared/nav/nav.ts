import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav {
  cantidadCarrito = 0;
  mostrarDropdownUsuario = false;
  mostrarMenuPrincipal = false;

  constructor(
    public authService: AuthService, 
    private router: Router,
    private cartService: CartService
  ) {
    // Suscribirse a los cambios del carrito
    this.cartService.carrito$.subscribe(carrito => {
      this.cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
    });
  }

  irAlPerfil(): void {
    this.router.navigate(['/perfil']);
    this.cerrarDropdowns();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/auth']);
  }

  cambiarContrasena(): void {
    // Redirigir a la página de cambio de contraseña
    this.router.navigate(['/cambiar-contrasena']);
    this.cerrarDropdowns();
  }

  toggleDropdownUsuario(): void {
    this.mostrarDropdownUsuario = !this.mostrarDropdownUsuario;
    this.mostrarMenuPrincipal = false;
  }

  toggleMenuPrincipal(): void {
    this.mostrarMenuPrincipal = !this.mostrarMenuPrincipal;
    this.mostrarDropdownUsuario = false;
  }

  cerrarDropdowns(): void {
    this.mostrarDropdownUsuario = false;
    this.mostrarMenuPrincipal = false;
  }
}

