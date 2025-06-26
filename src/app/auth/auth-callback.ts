import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Iniciando sesión...</p>'
})
export class AuthCallback implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Buscar el token en el parámetro 'token' (enviado por el backend)
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      localStorage.setItem('access_token', token);
      this.router.navigate(['/productos']);
    } else {
      this.router.navigate(['/not-found']);
    }
  }
}