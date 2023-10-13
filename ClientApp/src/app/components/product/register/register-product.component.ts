import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from "@components/product/product.service";
import {catchError, Subscription, tap} from "rxjs";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['register-product-component.css']
})
export class RegisterProductComponent implements OnInit{

  //properties
  public parentModalContent!: { title: string; body: string; buttonBackground: string  };
  private _router: Router;
  public isModalOpen: boolean = false;
  public screenWidth: number = 0;
  public formValueChangeSubscription! :Subscription;

  myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,
              router: Router,
              private productService: ProductService,
              private renderer: Renderer2,
              private changeDetector: ChangeDetectorRef) {

    this._router = router;
  }


  //hooks
  ngOnInit() {

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(25)]],
      type: ['-- Selecione o tipo de produto --', [Validators.required]],
      imageRef: ['', ],
    });
  }


  public productTypes: Array<{ name: string; value: number }> = [
    { name: "Orgânico", value: 0},
    { name: "Inôrganico", value: 1}
  ];

  //methods
  public submit() {
    this.productService
        .postProduct(this.myForm.value)
        .pipe(
          tap(response =>
            this._router.navigate(['/product-list'])),
          catchError((httpErrorResponse: HttpErrorResponse): any  => {
            this.openModal(httpErrorResponse);
          })
        ).subscribe()
  }

  openModal(httpErrorResponse: HttpErrorResponse){
    this.parentModalContent = {'title': 'Erro', 'body': httpErrorResponse.error, buttonBackground: 'btn-danger btn'}
    this.isModalOpen = true;
    this.changeDetector.detectChanges();
  }

}
