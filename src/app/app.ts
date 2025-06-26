import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Nav } from './shared/nav/nav';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, Header, Footer, CommonModule, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
  export class App {
  constructor(public authService: AuthService) {}
  modoOscuro = false;

  get mostrarNav(): boolean {
    const rol = this.authService.getRol();
    return rol !== 'administrador';
  }


  toggleDarkMode() {
  this.modoOscuro = !this.modoOscuro;

  if (this.modoOscuro) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}
}


