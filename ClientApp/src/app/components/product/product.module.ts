import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';

import { ProductListComponent } from "@components/product/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductCardComponent } from '@components/product/card';
import {RegisterProductComponent} from "@components/product/register";
import {SharedModule} from "../shared/shared.module";
import {ProductService} from "@service/product";

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
