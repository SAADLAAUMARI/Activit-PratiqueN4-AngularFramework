import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products : Array<Product>=[];

  public keyword: string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;
  constructor(private productService:ProductService,
              private router:Router) {

  }
  ngOnInit() {
      this.getProducts();
  }

getProducts(){

  this.productService.getProducts(this.keyword,this.currentPage,this.pageSize)
    .subscribe({
      next : (resp) =>{
          this.products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!)
          this.totalPages=Math.floor(totalProducts/ this.pageSize);
          if(totalProducts% this.pageSize!=0){
              this.totalPages=this.totalPages+1;
          }
          } ,
      error : err => {
        console.log(err);
      }
    })


 // this.products$=this.productService.getProducts();
}
  handleCheckProduct(product: Product) {
    this.productService.checkProducts(product).subscribe({
        next : updatedProduct=>{
         product.checked=!product.checked;
       // this.getProducts();
        }
      })
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sûre?"))
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        //this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id);
      }
      }
    );
  }

/*
  searchProducts() {
       this.currentPage=1;
       this.totalPages=0;
      this.productService.searchProducts(this.keyword, this.currentPage,this.pageSize).subscribe({
        next: value => {
          this.products = value; // Remplacer les produits par les résultats de la recherche
        }
      });
    }
*/
    handleGotoPage(page: number) {
        this.currentPage=page;
        this.getProducts();
    }

  handleEdit(product: Product) {
      this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
