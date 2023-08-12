import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  public products: Product[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Product[]>(baseUrl + 'product')
      .subscribe((data) => {
        this.products = data;
        console.log(this.products);
      });
  }
}

interface Product {
  name: string;
  price: number;
  quantity: number;
  description: string;
  type: string;
}
