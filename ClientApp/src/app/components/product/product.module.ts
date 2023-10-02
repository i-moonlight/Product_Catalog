import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "./list/product-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductCardComponent } from './product-card/product-card.component';
import {RegisterProductComponent} from "./register/register-product.component";
import {SharedModule} from "../shared/shared.module";
import {ProductService} from "./product.service";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    RegisterProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgOptimizedImage,
    SharedModule,
    FormsModule
  ],
  exports: [
    ProductListComponent,
  ],
  providers: [
    ProductService
  ],
})
export class ProductModule { }
