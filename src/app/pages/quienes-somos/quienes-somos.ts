import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css'
})
export class QuienesSomos {
  miembros = [
  {
  nombre: 'Juan Montaño',
  imagen:  "/miembros/juan.jpg",
  descripcion: 'Desarrollador Full Stack',
  email: 'juan.mont1208@gmail.com',
  rol: 'Desarrollador Full Stack'
  },

    {
      nombre: 'Axel Gonzalez',
      imagen: "/miembros/Axel.jpeg",
      descripcion: 'Lider de Proyecto',
      email: 'axelgonzalezyf28@gmail.com',
      rol: 'Lider de Proyecto'
    },
    {
      nombre: 'Lautaro Antiñanco',
      imagen: "/miembros/lautaro.jpg",
      descripcion: 'Analista Funcional',
      email: 'lautarodaniel1401@gmail.com',
      rol: 'Analista Funcional'
    },
    {
      nombre: 'Noah Miura',
      imagen: "/miembros/noah.jpg",
      descripcion: 'Desarrollador Backend',
      email: 'noahchamo@gmail.com',
      rol: 'Desarrollador Backend'
    },
  ]

}
