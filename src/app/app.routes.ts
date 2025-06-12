import { Routes } from '@angular/router';
import Dashboard from './auth/dashboard/dashboard';
import { Login } from './auth/login/login';
import { Registro } from './auth/registro/registro';

export const routes: Routes = [
    {path: "login", component: Login },
    {path: "admin", component: Dashboard },
    {path: "registro", component:Registro},
    {path:"", redirectTo: "/login", pathMatch: "full"},
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
