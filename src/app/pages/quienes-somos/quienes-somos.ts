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
  descripcion: 'Desarrollador Full Stack'
  },

    {
       nombre: 'Vianel Almendra ',
      imagen: "/miembros/vianel.heic",
      descripcion: 'Desarrollador frontend' 
    },
    {
      nombre: 'Axel Gonzalez',
      imagen: "/miembros/Axel.jpeg",
      descripcion: 'Scrum Master'
    },
    {
      nombre: 'Lautaro Antiñanco',
      imagen: "/miembros/lautaro.jpg",
      descripcion: 'Analista Funcional'
    },
    {
      nombre: 'Noah Miura',
      imagen: "/miembros/noah.jpg",
      descripcion: 'Desarrollador Backend'
    },
  ]

}
