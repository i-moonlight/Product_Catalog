import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable()
export class SidenavService {

  constructor() { }

  private readonly sidenav$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getSidenavStatus$(): Observable<boolean>{
     return this.sidenav$;
  }

  public setSidenavStatus$(sidenavStatus: boolean) {
    this.sidenav$.next(sidenavStatus);
  }
}
