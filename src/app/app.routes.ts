import { Routes } from '@angular/router';
import Dashboard from './auth/dashboard/dashboard';
import { Registro } from './auth/registro/registro';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { AuthComponent } from './auth/auth';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/product/product';
import { AuthGuard } from './auth/auth-guard';
import { adminDashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [
    {path: "quienes_somos", component:QuienesSomos,},
    {path: "auth", children:[
        { path: '', component: AuthComponent},
        { path: 'registro', component: Registro}
    ]},
    {path: "productos", component: Product, },
    {path: "cart", component:Cart, },
    {path:"", redirectTo: "/auth", pathMatch: "full"},
    {path: "admin", component: Dashboard, canActivate:[AuthGuard] },
    {path: "registro", component:Registro},
    { path: 'adminis', component: adminDashboard,  },

    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./auth/dashboard/dashboard'),
                canActivate:[AuthGuard]

            },
            {
                path: 'profile',
                loadComponent: () => import('./auth/profile/profile'),
                canActivate:[AuthGuard]

            },
            {
                path: 'tables',
                loadComponent: () => import('./auth/tables/tables'),
                canActivate:[AuthGuard]

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
