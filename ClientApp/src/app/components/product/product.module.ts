import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "@components/product/list/product-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterProductComponent} from "@components/product/register/register-product.component";

import { ProductCardComponent } from '@components/product/product-card/product-card.component';
import {SharedModule} from "@shared/shared.module";
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
