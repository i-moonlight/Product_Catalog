import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SideNavComponent} from "./side-nav/side-nav.component";
import {HeaderComponent} from "./header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";



@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports: [
    SideNavComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
