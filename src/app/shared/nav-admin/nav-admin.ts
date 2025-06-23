import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-admin',
  imports: [CommonModule],
  templateUrl: './nav-admin.html',
  styleUrl: './nav-admin.css'
})


export class NavAdmin {

  constructor(private router: Router, public authService: AuthService) {}
  irAlPerfil(): void {
    this.router.navigate(['/perfil']);
    }

}
