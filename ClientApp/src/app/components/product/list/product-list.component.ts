import {Component, Inject, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from "../../../interfaces";
import {ProductService} from "../product.service";
import {Subject, Subscription, takeUntil} from "rxjs";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnDestroy {

  //properties
  public searchInputPlhdr: string = "Digite o nome do produto";
  public products: Product[] = [];
  public pageIndex = 1;
  public totalPages: number = 1;
  private _baseUrl: string;
  private _http: HttpClient;
  public searchInput: string = '';
  private notifier = new Subject()
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private productService: ProductService,
  ) {
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

    const products = this.productService
      .fetchProducts(pageIndex)
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.totalPages = Number(data.headers.get('totalPages'));
        this.products = data.body as Product[];
      });
  }

  fetchProductsByName(productName:string) {

    this.productService
      .fetchProductsByName(productName)
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.products = data.body as Product[];
      });

  }


  ngOnDestroy(): void {
    this.notifier.next(1);
    this.notifier.complete();
  }
}
