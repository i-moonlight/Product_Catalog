import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from "@service/product";
@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['register-product-component.css']
})
export class RegisterProductComponent {


  myForm: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,
              private productService: ProductService) {}

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

  public submit() {
    this.productService
        .postProduct(this.myForm.value)
  }

}
