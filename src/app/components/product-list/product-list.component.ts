import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ConditionalExpr } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  currentCategoryId : number;
  currentCategoryName: string;
  searchMode : boolean;
  
  constructor(private productListService: ProductService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => 
    {
      this.listProducts();
    })
   
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
    
  }

  handleListProducts() {
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId)
    {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else
    {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    
    this.productListService.searchProducts(theKeyword).subscribe(data => this.products = data);


  }
}
