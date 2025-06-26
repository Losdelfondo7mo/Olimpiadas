import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
toastVisible = false;
    toastMensaje = '';

    mostrarToast(mensaje: string) {
      this.toastMensaje = mensaje;
      this.toastVisible = true;

      setTimeout(() => {
        this.toastVisible = false;
      }, 3000);
    }


producto: Producto | undefined;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductos().subscribe(productos => {
      this.producto = productos.find(p => p.id === id);
      this.cargando = false;
    });
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.nuevaResena.nombre = usuarioGuardado;
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.agregar(producto);
    this.mostrarToast(`"${producto.nombre}" fue agregado al carrito `);
  }

  resenas: { nombre: string; comentario: string; calificacion: number }[] = [];

nuevaResena = {
  nombre: '',
  comentario: '',
  calificacion: 5,
};

agregarResena() {
  if (
    this.nuevaResena.nombre.trim() &&
    this.nuevaResena.comentario.trim() &&
    this.nuevaResena.calificacion >= 1 &&
    this.nuevaResena.calificacion <= 5
  ) {
    this.resenas.push({ ...this.nuevaResena });
    this.nuevaResena = { nombre: '', comentario: '', calificacion: 5 };
  } else {
    alert('Por favor completa todos los campos correctamente.');
  }
}

}
