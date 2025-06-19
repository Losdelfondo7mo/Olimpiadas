import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { adminProducts } from '../products/products';
import { AdminOrders } from '../orders/orders';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule, adminProducts, AdminOrders],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class adminDashboard {
  activeTab: string = 'productos';

  setTab(tab: string) {
    this.activeTab = tab;
  }

}
