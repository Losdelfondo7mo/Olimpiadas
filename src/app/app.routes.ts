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

export const routes: Routes = [
    {path: "quienes_somos", component:QuienesSomos,},
    {path: "auth", children:[
        { path: 'registro', component: Registro},
        { path: '', component: AuthComponent},
      
    ]},
    {path: "productos", component: Product, },
    {path: "cart", component:Cart, },
    { path: 'admin', component: adminDashboard, canActivate: [AdminGuard] },
    {path:"", redirectTo: "/auth", pathMatch: "full"},
]
