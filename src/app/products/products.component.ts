import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService:ProductService,
              private router:Router,public appState:AppStateService) {

  }
  ngOnInit() {
      this.getProducts();
  }

getProducts(){
 this.appState.setProductState({
     status: "LOADING"
 })
  this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize)
    .subscribe({
      next : (resp) =>{
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!)
          //this.appState.productsState.totalProducts=totalProducts;
          let totalPages=Math.floor(totalProducts/ this.appState.productsState.pageSize);
          if(totalProducts% this.appState.productsState.pageSize!=0){
             ++totalPages;
          }
          this.appState.setProductState({
              products:products,
              totalProducts : totalProducts,
              totalPages : totalPages,
              status: "LOADED"
          })
          } ,
      error : err => {
          this.appState.setProductState({
              status: "ERROR",
              errorMessage : err
          })

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
        this.getProducts();
        //this.appState.productsState.products=this.appState.productsState.products.filter((p:any)=>p.id!=product.id);
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
        this.appState.productsState.currentPage=page;
        this.getProducts();
    }

  handleEdit(product: Product) {
      this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
