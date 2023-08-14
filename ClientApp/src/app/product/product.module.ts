import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  exports: [
    ProductListComponent,
    RegisterProductComponent
  ]
})
export class ProductModule { }
