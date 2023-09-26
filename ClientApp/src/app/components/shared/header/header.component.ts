import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //properties
  public menuStatus: boolean = false;

  //Event Emitters
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  public SideNavToggle(): void {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
