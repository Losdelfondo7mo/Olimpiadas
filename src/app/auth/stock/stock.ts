import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.html',
  styleUrls: ['./stock.css']
})
export class Stock {
  products: { name: string; quantity: number }[] = [];
  newProduct: { name: string; quantity: number } = { name: '', quantity: 0 };

  addProduct(productForm: any) {
    if (this.newProduct.name.trim() && this.newProduct.quantity > 0) {
      this.products.push({
        name: this.newProduct.name.trim(),
        quantity: this.newProduct.quantity
      });
      this.newProduct = { name: '', quantity: 0 };
      productForm.reset();
    }
  }

  editProduct(index: number) {
    const product = this.products[index];
    this.newProduct = { ...product };
    this.products.splice(index, 1);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }
}

