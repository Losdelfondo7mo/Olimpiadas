// src/app/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent} from './auth';
import { Registro } from './registro/registro';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'registro', component: Registro, data: { animation: 'RegisterPage' } },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
