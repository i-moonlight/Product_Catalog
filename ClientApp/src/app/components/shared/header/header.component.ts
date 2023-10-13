import {Component, EventEmitter, Output, OnInit, HostListener} from '@angular/core';
import {ScreenDimensionsEnum} from "@enums/screen-dimensions";
import {identifyDeviceType} from "@util/getDimensionsUtil";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //properties
  public menuStatus: boolean = true;
  public screenWidth: number = 0;
  public deviceType!: Array<{ deviceType: string; isEnable: boolean }>;


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
    this.deviceType = identifyDeviceType(this.screenWidth);
    this.checkIfOpenMenu(this.deviceType);
  }

  public checkIfOpenMenu(deviceType: {deviceType: string, isEnable: boolean}[]): any {
    if(deviceType[0].isEnable) {
      this.menuStatus = false;
      this.sideNavToggled.emit(this.menuStatus)
    }
    else if(deviceType[1].isEnable){
      this.menuStatus = true;
      this.sideNavToggled.emit(this.menuStatus);
    }
  }
}
