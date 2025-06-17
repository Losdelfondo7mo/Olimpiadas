import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../../header/header';
import { Footer } from "../../footer/footer";


@Component({
  selector: 'app-layout',
  imports: [Header, Sidebar, RouterOutlet, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export default class Layout {

}
