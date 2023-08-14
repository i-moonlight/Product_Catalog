import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs";
@Component({
  selector: 'app-register-product-component',
  templateUrl: './register-product.component.html'
})
export class RegisterProductComponent {

  private _router: Router;
  private _baseUrl: string;
  private _http: HttpClient;
  myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,
              http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              router: Router)

  {
      this._http = http;
      this._baseUrl = baseUrl;
      this._router = router;
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      type: ['---Selecione o tipo de produto---', [Validators.required]],
    });
  }

  public productTypes: Array<{ name: string; value: number }> = [
    { name: "Organic", value: 0},
    { name: "Non-Organic", value: 1}
  ];

  public submit() {

    this._http.post(this._baseUrl + 'product',
      this.myForm.value, {observe: 'response'})
      .pipe(
        tap(response =>
          this._router.navigate(['/product-list'])),
        catchError((error): any  => {
          alert(error.error);
        })
      )
      .subscribe();

  }

}
