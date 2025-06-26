import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="container mt-4">
      <h2>Panel de Administración</h2>
      
      <div class="row mt-4">
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gestión de Productos</h5>
              <p class="card-text">Administra el inventario de productos.</p>
              <button class="btn btn-primary">Administrar</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gestión de Pedidos</h5>
              <p class="card-text">Visualiza y gestiona los pedidos realizados.</p>
              <button class="btn btn-primary">Administrar</button>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Gestión de Usuarios</h5>
              <p class="card-text">Administra los usuarios registrados.</p>
              <button class="btn btn-primary">Administrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin.css'],
  standalone: true
})
export class adminDashboard {
  // Implementación del dashboard de administrador
}