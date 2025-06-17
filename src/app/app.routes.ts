import { Routes } from '@angular/router';
import Dashboard from './auth/dashboard/dashboard';
import { Registro } from './auth/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { AuthComponent } from './auth/auth';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/product/product';

export const routes: Routes = [
    {path: "dasboard", component: Dashboard },
    {path: "quienes_somos", component:QuienesSomos},
    {path: "auth", children:[
        { path: '', component: AuthComponent},
        { path: 'registro', component: Registro}
    ]},
    {path: "productos", component: Product},
    {path: "cart", component:Cart},
    {path:"", redirectTo: "/auth", pathMatch: "full"},
    {path: "admin", component: Dashboard },
    {path: "registro", component:Registro},
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./auth/dashboard/dashboard'),

            },
            {
                path: 'profile',
                loadComponent: () => import('./auth/profile/profile'),

            },
            {
                path: 'tables',
                loadComponent: () => import('./auth/tables/tables'),

            },
            {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ]
    }
];
