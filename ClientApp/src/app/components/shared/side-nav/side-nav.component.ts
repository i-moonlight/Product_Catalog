import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {sidenavItems} from "./sidenav-items";
import {SidenavService} from "@shared/side-nav/sidenav.service";
import {identifyDeviceType} from "@util/getDimensionsUtil";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnChanges{

  constructor(
    private _sidenavService: SidenavService) {
  }

  //properties
  @Input() sideNavStatus!: boolean;
  public _sidenavItems: {number: number, name: string, icon: string, route: string}[] = sidenavItems;

  ngOnChanges(changes: SimpleChanges): void {
    this._sidenavService
      .setSidenavStatus$(this.sideNavStatus)
  }

}
