import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: boolean;
  categoria: string
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
    nuevoProducto: Omit<Producto, 'id'> = {
      nombre: '',
      descripcion: '',
      precio: 0,
      disponibilidad: true,
      categoria: '',
    };
productoEditando: Producto | null = null;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }



  agregarProducto() {
  this.productService.agregarProducto(this.nuevoProducto).subscribe(() => {
    // Resetear nuevoProducto con todas las propiedades requeridas
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: 0,
      disponibilidad: true,
    };
  });
}

  iniciarEdicion(producto: Producto) {
    this.productoEditando = { ... producto };
  }

  guardarCambios() {
  if (!this.productoEditando) return;

  this.productService.editarProducto(this.productoEditando).subscribe(actualizado => {
    const index = this.productos.findIndex(p => p.id === actualizado.id);
    if (index > -1) {
      this.productos[index] = actualizado;
    }
    this.productoEditando = null;
  }, error => {
    console.error('Error al actualizar producto:', error);
    alert('Hubo un error al actualizar el producto');
  });
}


  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  cancelarEdicion() {
    this.productoEditando = null;
  }
}
