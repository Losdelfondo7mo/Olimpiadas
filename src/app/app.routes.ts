import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Registro } from './auth/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { AuthComponent } from './auth/auth';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {path: "dasboard", component: Dashboard },
    {path: "quienes_somos", component:QuienesSomos},
    {path: "auth", children:[
        { path: '', component: AuthComponent},
        { path: 'registro', component: Registro}
    ]},
    {path: "home", component: Home},
    {path:"", redirectTo: "/login", pathMatch: "full"}
];
