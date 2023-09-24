import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "./list/product-list.component";
import {RegisterProductComponent} from "./register/register-product.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductService} from "./service/product.service";

@NgModule({
  declarations: [
    ProductListComponent,
    RegisterProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgOptimizedImage,
  ],
  exports: [
    ProductListComponent,
    RegisterProductComponent
  ],
  providers: [
    ProductService
  ],
})
export class ProductModule { }
