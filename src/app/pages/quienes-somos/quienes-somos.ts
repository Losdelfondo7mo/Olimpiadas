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
      nombre: 'Juan Ignacio',
      imagen: 'https://i.pinimg.com/736x/bd/82/37/bd82371b8a2d166e2a611ecf8e347c1a.jpg',
      descripcion: 'el mas crack de todos los cracks '
    },
    {
       nombre: 'Vianel Almendra ',
      imagen: 'https://i.pinimg.com/736x/bd/82/37/bd82371b8a2d166e2a611ecf8e347c1a.jpg',
      descripcion: 'el mas crack de todos los cracks ' 
    },
    {
      nombre: 'Axel Gonzalez',
      imagen: 'https://i.pinimg.com/736x/bd/82/37/bd82371b8a2d166e2a611ecf8e347c1a.jpg',
      descripcion: 'el mas crack de todos los cracks '
    },
    {
      nombre: 'Lautaro Antiñanco',
      imagen: 'https://i.pinimg.com/736x/bd/82/37/bd82371b8a2d166e2a611ecf8e347c1a.jpg',
      descripcion: 'el modelito  '
    },
  ]

}
