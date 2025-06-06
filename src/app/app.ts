import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './auth/login/login';
import { routes } from './app.routes';
import { Nav } from './shared/nav/nav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,Nav, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'olimpiadas';
}
