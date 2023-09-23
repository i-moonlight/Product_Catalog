import {Component, Input, OnInit} from '@angular/core';
import {sidenavItems} from "../sidenav-items";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  //properties
  @Input() sideNavStatus: boolean = true;
  public _sidenavItems: {number: number, name: string, icon: string, route: string}[] = sidenavItems;
}
