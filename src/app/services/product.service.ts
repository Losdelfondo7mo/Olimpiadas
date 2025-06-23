import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , tap} from 'rxjs';




export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  disponibilidad: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'https://backend-9s6b.onrender.com/api/productos';

  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarProductos();
    }


    //para editar

    editarProducto(producto: Producto): Observable<Producto> {
    const token = localStorage.getItem('access_token');
    console.log('token usado:', token)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto, { headers });
  }

  eliminarProducto(productoId: number): Observable<any> {
  console.log('DELETE:', `${this.apiUrl}/${productoId}`);
  return this.http.delete(`${this.apiUrl}/${productoId}`);
}
 
  cargarProductos() {
    this.http.get<Producto[]>(this.apiUrl)
      .subscribe(productos => this.productosSubject.next(productos));
  }

  getProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  agregarProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<Producto>(`${this.apiUrl}/crear`, producto, { headers }).pipe(
    tap(nuevoProducto => {
      const productos = this.productosSubject.value;
      this.productosSubject.next([...productos, nuevoProducto]);
    })
  );
}
}
