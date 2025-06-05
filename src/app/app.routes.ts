import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';

export const routes: Routes = [
    {path: "login", component: Login },
    {path: "dasboard", component: Dashboard },
    {path: "registro", component:Registro},
    {path: "quienes_somos", component:QuienesSomos},
    {path:"", redirectTo: "/login", pathMatch: "full"}
];
