import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { Registro } from './auth/registro/registro';
import { Product } from './pages/product/product';
// Cambiar esta línea - COMMENTED OUT
// import { Cart } from './components/cart/cart';
// Por esta línea
import { Cart } from './pages/cart/cart';
import { Perfil } from './pages/perfil/perfil';
import { MisPedidos } from './pages/mis-pedidos/mis-pedidos';
import { ProductDetail } from './pages/product-detail/product-detail';
import { AuthCallback } from './auth/auth-callback/auth-callback';
import { NotFound } from './pages/not-found/not-found';
import { Error404 } from './pages/error404/error404';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
// Importar los nuevos componentes
import { PagoExitoso } from './components/pago-exitoso/pago-exitoso';
import { PagoFallido } from './components/pago-fallido/pago-fallido';
import { PagoPendiente } from './components/pago-pendiente/pago-pendiente';
import { adminDashboard } from './admin/dashboard/dashboard';
import { QuienesSomos } from './pages/quienes-somos/quienes-somos';
import { CambiarContraComponent } from './auth/cambiar-contra/cambiar-contra';

export const routes: Routes = [
  {path:"", redirectTo: "/auth", pathMatch: "full"},
  {path: "quienes_somos", component:QuienesSomos, canActivate: [AuthGuard]},
  { path: 'auth/callback', component: AuthCallback },
  {path: "productos", component: Product, canActivate: [AuthGuard] },
  {path: "cart", component: Cart, canActivate: [AuthGuard] },
  {path: "perfil", component: Perfil, canActivate: [AuthGuard] },
  {path: "mis-pedidos", component: MisPedidos, canActivate: [AuthGuard] },
  { path: 'producto/:id', component: ProductDetail, canActivate: [AuthGuard] },
  {path: "cambiar-contrasena", component: CambiarContraComponent, canActivate: [AuthGuard] },
  {path: "auth", component: AuthComponent },
  {path: "auth/registro", component: Registro },
  // Nuevas rutas para Mercado Pago
  {path: "pago-exitoso/:pedidoId", component: PagoExitoso, canActivate: [AuthGuard] },
  {path: "pago-fallido/:pedidoId", component: PagoFallido, canActivate: [AuthGuard] },
  {path: "pago-pendiente/:pedidoId", component: PagoPendiente, canActivate: [AuthGuard] },
  {path: "auth-old", children:[
    { path: 'registro', component: Registro},
    { path: 'login', component: AuthComponent},
  ]},
  { path: 'admin', component: adminDashboard, canActivate: [AdminGuard] },
  { path: 'not-found', component: NotFound},
  { path: '**', component: Error404},
];
