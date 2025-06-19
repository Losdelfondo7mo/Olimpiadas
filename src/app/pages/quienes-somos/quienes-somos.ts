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
  telefono: '2945642191',
  rol: 'Desarrollador Full Stack'
  },

    {
       nombre: 'Vianel Almendra ',
      imagen: "/miembros/vianel.heic",
      descripcion: 'Desarrollador frontend',
      email: 'vianelalmendra180306@gmail.com',
      telefono: '2945642191',
      rol: 'Desarrollador Frontend'
    },
    {
      nombre: 'Axel Gonzalez',
      imagen: "/miembros/Axel.jpeg",
      descripcion: 'Scrum Master',
      email: 'axelgonzalezyf28@gmail.com',
      telefono: '2945642191',
      rol: 'Scrum Master'
    },
    {
      nombre: 'Lautaro Antiñanco',
      imagen: "/miembros/lautaro.jpg",
      descripcion: 'Analista Funcional',
      email: 'lautarodaniel1401@gmail.com',
      telefono: '2945642191',
      rol: 'Analista Funcional'
    },
    {
      nombre: 'Noah Miura',
      imagen: "/miembros/noah.jpg",
      descripcion: 'Desarrollador Backend',
      email: 'noahchamo@gmail.com',
      telefono: '2945642191',
      rol: 'Desarrollador Backend'
    },
  ]

}
