import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Registro } from './auth/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { AuthComponent } from './auth/auth';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {path: "dasboard", component: Dashboard },
    {path: "quienes_somos", component:QuienesSomos},
    {path: "auth", children:[
        { path: '', component: AuthComponent},
        { path: 'registro', component: Registro}
    ]},
    {path: "home", component: Home},
    {path: "cart", component:Cart},
    {path:"", redirectTo: "/auth", pathMatch: "full"}
];
