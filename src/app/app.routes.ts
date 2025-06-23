import { Routes } from '@angular/router';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { AuthComponent } from './auth/auth';
import { Cart } from './pages/cart/cart';
import { Product } from './pages/product/product';
import { AuthGuard } from './auth/auth-guard';
import { adminDashboard } from './admin/dashboard/dashboard';
import { Registro } from './auth/registro/registro';
import { AdminGuard } from './guard/admin-guard';
import { NotFound } from './pages/not-found/not-found';
import { Perfil } from './pages/perfil/perfil';
import { AuthCallback } from './auth/auth-callback';
import { MisPedidos } from './pages/mis-pedidos/mis-pedidos';
import { Error404 } from './pages/error404/error404';


export const routes: Routes = [
    {path:"", redirectTo: "/auth", pathMatch: "full"},
    {path: "quienes_somos", component:QuienesSomos, canActivate: [AuthGuard]},
    { path: 'auth/callback', component: AuthCallback },
    {path: "productos", component: Product, canActivate: [AuthGuard] },
    {path: "cart", component: Cart, canActivate: [AuthGuard] },
    {path: "perfil", component: Perfil, canActivate: [AuthGuard] },
    {path: "mis-pedidos", component: MisPedidos, canActivate: [AuthGuard] },


    {path: "auth", component: AuthComponent },
    {path: "auth/registro", component: Registro },

    {path: "auth-old", children:[
        { path: 'registro', component: Registro},
        { path: 'login', component: AuthComponent},
      
    ]},
    { path: 'admin', component: adminDashboard, canActivate: [AdminGuard] },
    { path: 'not-found', component: NotFound},
    { path: '**', component: Error404}
    

]
