import {
  Component,
  HostListener,
  Inject,
  OnDestroy, OnInit,
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductService} from "@components/product/product.service";
import {Subject, takeUntil} from "rxjs";
import {Product} from "@interfaces/product";
import {identifyDeviceType} from "@util/getDimensionsUtil";
import {SidenavService} from "@shared/side-nav/sidenav.service";
import {orderingItemsHelper} from "@components/product/list/helpers/ordering-items-helper";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['product-list.component.css']
})
export class ProductListComponent implements OnDestroy, OnInit {

  //properties
  public searchInputPlaceholder: string = "Digite o nome do produto";
  public emptyProductsMessage!: string;
  public sidenavStatus!: boolean;
  public screenWidth: number = 0;
  public deviceType!: Array<{ deviceType: string; isEnable: boolean }>;
  public products: Product[] = [];
  public pageIndex = 1;
  public totalPages: number = 1;
  public totalCount!: number;
  private _baseUrl: string;
  private _http: HttpClient;
  public searchInput: string = '';
  public hasProducts!: boolean;
  private notifier = new Subject()
  public orderingValue: string = '';
  public initialValue!: {label: string, value: string};
  public selectFilterOption!: {label: string, value: string};
  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private productService: ProductService,
              private _sidenavService: SidenavService
  ) {
    this._http = http;
    this._baseUrl = baseUrl;
  }


  ngOnInit() {
    this.getStatusSidenav();
    this.screenWidth = window.innerWidth;
    this.deviceType = identifyDeviceType(this.screenWidth);

    this.orderingValue = orderingItemsHelper[1].value;
    this.fetchProductsByOrderingValue(this.orderingValue, this.pageIndex.toString());
  }

  public getStatusSidenav(){
    this._sidenavService
      .getSidenavStatus$()
      .subscribe( (sidenavStatus: boolean) => {
        this.sidenavStatus = sidenavStatus;
        if(sidenavStatus){
          this.deviceType[0].isEnable = false;
          this.deviceType[1].isEnable = true;
        }
        else{
          this.deviceType[0].isEnable = true;
          this.deviceType[1].isEnable = false;
        }

      })
  }

  public hasOrderingValue(orderingValue: string): void{
    this.orderingValue ?
      this.fetchProductsByOrderingValue(orderingValue,this.pageIndex.toString()) :
      this.fetchProducts(this.pageIndex)
  }

  public pagePrev(){
    if(this.pageIndex > 1){
      this.pageIndex = this.pageIndex - 1;
    }
    this.hasOrderingValue(this.orderingValue);
  }

  public pageNext(){
    if(this.pageIndex < this.totalPages){
      this.pageIndex = this.pageIndex + 1;
    }
    this.hasOrderingValue(this.orderingValue);
  }

  public isProductsListEmpty(products: Array<Product>): boolean {
     return !products.length ?
        this.hasProducts = false :
        this.hasProducts = true;
  }


  fetchProducts(pageIndex:number) {
    const products = this.productService
      .fetchProducts(pageIndex)
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.totalPages = Number(data.headers.get('totalPages'));
        this.totalCount = Number(data.headers.get('totalCount'));
        this.products = data.body as Product[];
        this.isProductsListEmpty(this.products);
        this.emptyProductsMessage = "Não há produtos cadastrados.";
      });
  }

  fetchProductsByName(productName:string) {
    if(!productName.length)
      return;

    this.productService
      .fetchProductsByName(productName)
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.totalPages = Number(data.headers.get('totalPages'));
        this.totalCount = Number(data.headers.get('totalCount'));
        this.products = data.body as Product[];
        this.isProductsListEmpty(this.products);
        this.emptyProductsMessage = "Produto não cadastrado.";
      });
  }

  makeQuery(orderingValue: string, pageIndex: string){
    let query: string;
    query = `orderingValue=${orderingValue}&pageIndex=${pageIndex}`;
    return query;
  }

  fetchProductsByOrderingValue(orderingValue: string, pageIndex: string){
    this.productService
      .fetchProductsByOrderingValue(this.makeQuery(orderingValue, pageIndex))
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => {
        this.totalPages = Number(data.headers.get('totalPages'));
        this.totalCount = Number(data.headers.get('totalCount'));
        this.products = data.body as Product[];
        this.isProductsListEmpty(this.products);
        this.emptyProductsMessage = "Nenhum produto foi encontrado.";
      });
  }

  //Event listeners
  @HostListener('window:resize')
  onResize(){
    this.screenWidth = window.innerWidth;
    this.deviceType = identifyDeviceType(this.screenWidth);
  }

  ngOnDestroy(): void {
    this.notifier.next(1);
    this.notifier.complete();
  }

  protected readonly orderingItems = orderingItemsHelper;
}
