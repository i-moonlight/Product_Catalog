import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "@components/shared/header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";
import {SideNavComponent} from "@shared/side-nav/side-nav.component";

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
