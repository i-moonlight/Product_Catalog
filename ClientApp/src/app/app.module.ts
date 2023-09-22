import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterProductComponent } from "./product/register/register-product.component";
import { ProductListComponent } from "./product/list/product-list.component";
import { ProductModule } from "./product/product.module";
import { SideNavComponent } from "./side-nav/side-nav.component";
import {HeaderComponent} from "./header/header.component";


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    ProductModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'register-product', component: RegisterProductComponent},
      {path: 'product-list', component: ProductListComponent},
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
