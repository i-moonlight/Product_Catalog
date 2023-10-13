import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "@components/shared/header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";
import {SideNavComponent} from "@shared/side-nav/side-nav.component";
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    SideNavComponent,
    HeaderComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports: [
    SideNavComponent,
    HeaderComponent,
    ModalComponent
  ]
})
export class SharedModule { }
