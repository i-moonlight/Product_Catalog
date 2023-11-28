import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from "@components/shared/header/header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterLink } from "@angular/router";
import {SideNavComponent} from "@shared/side-nav/side-nav.component";
import { ModalComponent } from './modal/modal.component';
import {SidenavService} from "@shared/side-nav/sidenav.service";

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
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  exports: [
    SideNavComponent,
    HeaderComponent,
    ModalComponent
  ],
  providers: [
    SidenavService
  ]
})
export class SharedModule { }
