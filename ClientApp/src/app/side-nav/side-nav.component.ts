import {Component, Input, OnInit} from '@angular/core';
import {sidenavItems} from "../sidenav-items";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  //properties
  public isExpanded: boolean = false;
  public _sidenavItems: {number: number, name: string, icon: string, route: string}[] = null!
  ngOnInit(): void {
    this._sidenavItems = sidenavItems;
  }

  //methods
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
