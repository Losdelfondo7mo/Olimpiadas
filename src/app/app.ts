import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { routes } from './app.routes';
import { Nav } from './shared/nav/nav';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { NavAdmin } from './shared/nav-admin/nav-admin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, Header, Footer, CommonModule, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
  export class App {
  constructor(public authService: AuthService) {}

  get mostrarNav(): boolean {
    const rol = this.authService.getRol();
    return rol !== 'administrador';
  }
}


