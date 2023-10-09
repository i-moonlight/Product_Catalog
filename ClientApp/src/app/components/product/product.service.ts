import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Product} from "@interfaces/product";

@Injectable()
export class ProductService {

  //properties
  private _router: Router;
  private readonly _baseUrl: string;
  private _http: HttpClient;
  public totalPages: number = 1;
  public pageIndex = 1;
  public products: Product[] = [];
  constructor(
    http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    router: Router,
  ) {
    this._http = http;
    this._baseUrl = baseUrl;
    this._router = router;
  }


  public fetchProducts(pageIndex:number): Observable<HttpResponse<Product[]>> {
    return this._http
      .get<Product[]>(this._baseUrl + 'product?pageIndex=' + pageIndex,
        { observe: 'response' })
  }

  public fetchProductsByName(productName:string): Observable<HttpResponse<Product[]>> {
    return this._http
      .get<Product[]>(this._baseUrl + 'product/byName?productName=' + productName,
        { observe: 'response' })
  }
  public postProduct(formData: FormGroup){
    this._http.post<Product>(this._baseUrl + 'product',
      formData, {observe: 'response'})
      .pipe(
        tap(response =>
          this._router.navigate(['/product-list'])),
        catchError((error): any  => {
          alert(error.error);
        })
      ).subscribe()
  }
}
