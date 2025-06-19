import { Routes } from '@angular/router';
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
      
    ]},
    {path: "productos", component: Product, },
    {path: "cart", component:Cart, },
    {path:"", redirectTo: "/auth", pathMatch: "full"},
    { path: 'adminis', component: adminDashboard,  },
]
