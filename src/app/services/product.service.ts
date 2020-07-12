import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
 

  private baseURL = 'http://localhost:8080/api/products'; 

  private categoryURL = 'http://localhost:8080/api/product-category';

  constructor(private httpClient : HttpClient) { }

  getProductCategories() : Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe(
      map(response => response._embedded.productCategory)
      );

  }
  
  getProductList(theCategoryId : number) : Observable<Product[]> {

    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${theCategoryId}`
    return this.getProducts(searchURL);
  }

  getProduct(theProductId: number) : Observable<Product>{

    const productURL = `${this.baseURL}/${theProductId}`;
    return this.httpClient.get<Product>(productURL);
    
  }



  searchProducts(theKeyword: string) : Observable<Product[]> {

    const searchURL = `${this.baseURL}/search/findByNameContaining?value=${theKeyword}`
      return this.getProducts(searchURL);
  }

  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponseProductCategory {
  _embedded : {
    productCategory: ProductCategory[]
  }
}

interface GetResponseProducts {
  _embedded : {
    products: Product[]
  }
}
