import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@Component({
  selector: 'app-error404',
  imports: [RouterModule],
  templateUrl: './error404.html',
  styleUrl: './error404.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Error404 {
}
