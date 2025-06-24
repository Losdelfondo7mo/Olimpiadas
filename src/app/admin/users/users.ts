import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  usuarios: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsuarios().subscribe({
  next: data => {

    this.usuarios = data;
  },
  error: err => {
    console.error('Error al obtener usuarios', err);
  }
});
  }

}
