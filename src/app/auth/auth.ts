import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { fader } from './route-animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.html',
  imports:[RouterOutlet, RouterModule],
  animations: [fader],
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}


