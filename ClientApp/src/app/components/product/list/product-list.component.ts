import {Component, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from "../../../interfaces";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent {
  public searchInputPlhdr: string = "Digite o nome do produto";
  public products: Product[] = [];
  public pageIndex = 1;
  public totalPages: number = 1;
  private _baseUrl: string;
  private _http: HttpClient;
  public searchInput: string = '';
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._http = http;
    this._baseUrl = baseUrl;
  }

  ngOnInit() {
    this.fetchProducts(this.pageIndex);
  }

  public pagePrev(){
    if(this.pageIndex > 1){
      this.pageIndex = this.pageIndex - 1;
      this.fetchProducts(this.pageIndex);
    }
  }

  public pageNext(){
    if(this.pageIndex < this.totalPages){
      this.pageIndex = this.pageIndex + 1;
      this.fetchProducts(this.pageIndex);
    }
  }


  fetchProducts(pageIndex:number) {
    this._http.get<Product[]>(this._baseUrl + 'product?pageIndex=' + this.pageIndex, { observe: 'response' })
      .subscribe((data) => {
        this.totalPages = Number(data.headers.get('totalPages'));
        this.products = data.body as Product[];
      });
  }

  fetchProductsByName(productName:string) {

    if(productName.length == 0){ //check if the search input is empty
      this.fetchProducts(this.pageIndex);
      return;
    }

    this._http.get<Product[]>(this._baseUrl + 'product/byName?productName=' + productName, { observe: 'response' })
      .subscribe((data) => {
        this.products = data.body!;
      });
  }
}
