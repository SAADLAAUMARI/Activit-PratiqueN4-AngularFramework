import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products : Array<Product> = [];
  constructor(private productService:ProductService) {

  }
  ngOnInit() {
      this.getProducts();
  }

getProducts(){
  this.productService.getProducts()
    .subscribe({
      next : data => this.products=data,
      error : err => {
        console.log(err);
      }
    })
}
  handleCheckProduct(product: Product) {
    this.productService.checkProducts(product).subscribe({
        next : updatedProduct=>{
         // product.checked=!product.checked;
        this.getProducts();
        }
      })
  }
}
