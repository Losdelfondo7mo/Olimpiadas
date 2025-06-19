import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

@Component({
  selector: 'app-admin-products',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class adminProducts implements OnInit{
     productos: Producto[] = [];
  nuevoProducto: Omit<Producto, 'id'> = { nombre: '', descripcion: '', precio: 0, };
  productoEditando: Producto | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  agregarProducto() {
    this.productService.agregarProducto(this.nuevoProducto);
    this.nuevoProducto = { nombre: '', descripcion: '', precio: 0, };
  }

  iniciarEdicion(producto: Producto) {
    this.productoEditando = { ...producto };
  }

  guardarCambios() {
    if (!this.productoEditando) return;
    const index = this.productos.findIndex(p => p.id === this.productoEditando!.id);
    if (index > -1) {
      this.productos[index] = { ...this.productoEditando };
      // Actualizar localStorage
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
    this.productoEditando = null;
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }
}
