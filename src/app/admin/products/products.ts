import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-admin-products',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class adminProducts {
    productos: Producto[] = [
    { id: 1, nombre: 'Producto A', descripcion: 'Descripción A', precio: 100, stock: 10 },
    { id: 2, nombre: 'Producto B', descripcion: 'Descripción B', precio: 150, stock: 5 }
  ];

  nuevoProducto: Producto = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0 };
  productoEditando: Producto | null = null;

  agregarProducto() {
    const nuevo = { ...this.nuevoProducto, id: Date.now() };
    this.productos.push(nuevo);
    this.nuevoProducto = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0 };
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  iniciarEdicion(producto: Producto) {
    this.productoEditando = { ...producto };
  }

  guardarCambios() {
    if (!this.productoEditando) return;
    const index = this.productos.findIndex(p => p.id === this.productoEditando!.id);
    if (index > -1) {
      this.productos[index] = { ...this.productoEditando };
    }
    this.productoEditando = null;
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }
}
