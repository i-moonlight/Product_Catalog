import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "./list/product-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ProductCardComponent } from './product-card/product-card.component';
import {RegisterProductComponent} from "./register/register-product.component";

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
        NgOptimizedImage
    ],
  exports: [
    ProductListComponent,
  ]
})
export class ProductModule { }
