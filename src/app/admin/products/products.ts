import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';


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

    categoriaLabels: { [key: string]: string } = {
    paquetesCompletos: 'Paquetes turísticos completos',
    vuelos: 'Vuelos nacionales e internacionales',
    estadias: 'Estadías / Alojamientos',
    alquilerAutos: 'Alquiler de autos',
    actividades: 'Actividades y excursiones',
    serviciosAdicionales: 'Servicios adicionales'
  };


  categoriaKeys: string[] = [];


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.categoriaKeys = Object.keys(this.categoriaLabels);
    this.productService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }



  agregarProducto() {
  this.productService.agregarProducto(this.nuevoProducto).subscribe(() => {
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


  eliminar(productoId: number) {
  Swal.fire({
    title: '¿Estás seguro de que deseas eliminar este producto?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.productService.eliminarProducto(productoId).subscribe({
        next: () => {

          this.productos = this.productos.filter(p => p.id !== productoId);

          // Confirmación visual de eliminación
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El producto fue eliminado correctamente.',
            confirmButtonColor: '#3085d6'
          });
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'No se puede eliminar el producto',
            text: 'Este producto está asociado a un pedido existente.',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#d33'
          });
        }
      });
    }
  });
}


  cancelarEdicion() {
    this.productoEditando = null;
  }


  

}
