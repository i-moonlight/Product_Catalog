import {Component, EventEmitter, Output, OnInit, HostListener} from '@angular/core';
import {ScreenDimensionsEnum} from "../enums/screen-dimensions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //properties
  public menuStatus: boolean = true;
  public screenWidth: number = 0;

  //Event Emitters
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  //hooks
  ngOnInit(): void {
    //setting sidenav initial state to open
    this.sideNavToggled.emit(this.menuStatus);
  }

  //methods
  public SideNavToggle(): void {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  //Angular built-in decorator to listen to event and handle method
  @HostListener('window:resize')
  onResize(): void{
    //innerWidth returns the width of the window's layout viewport
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= ScreenDimensionsEnum.tablet)
      this.sideNavToggled.emit(false);
    else if(this.screenWidth > ScreenDimensionsEnum.laptop)
      this.sideNavToggled.emit(true);
  }
}
