import {
  ChangeDetectorRef,
  Component, OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from "@components/product/product.service";
import {catchError, Subject, takeUntil, tap} from "rxjs";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {moneyMask} from "@components/product/helpers/format-currency-helper";
import {filteringItemsHelper} from "@components/product/helpers/filtering-items-helper";

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['register-product-component.css']
})
export class RegisterProductComponent implements OnInit, OnDestroy{

  //properties
  public parentModalContent!: { title: string; body: string; buttonBackground: string  };
  private _router: Router;
  public isModalOpen: boolean = false;
  public screenWidth: number = 0;
  private notifier = new Subject()
  public priceInputPlaceholder: string = "R$ 0,00";
  protected readonly moneyMask = moneyMask;

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
      type: ['-- Selecione a categoria do produto --', [Validators.required]],
      imageRef: ['', ],
    });
  }


  //methods
  public formatPriceAsNumber(price: string): number {
    const priceWithoutNonNumericCharacters = price.replace(/\D/g, '');
    return parseFloat(priceWithoutNonNumericCharacters)/100;
  }
  public submit() {
    const price = this.myForm.controls.price.value;
    const priceAsNumber = this.formatPriceAsNumber(price);
    this.myForm.controls.price.setValue(priceAsNumber);

    this.productService
        .postProduct(this.myForm.value)
        .pipe(
          tap(response =>
            this._router.navigate(['/product-list'])),
          takeUntil(this.notifier),
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

  ngOnDestroy(): void {
    this.notifier.next(1);
    this.notifier.complete();
  }

  protected readonly productTypes = filteringItemsHelper;
}
