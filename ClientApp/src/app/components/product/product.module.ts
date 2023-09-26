import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "./list/product-list.component";
import {RegisterProductComponent} from "./register/register-product.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProductListComponent,
    RegisterProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ProductListComponent,
    RegisterProductComponent
  ]
})
export class ProductModule { }
