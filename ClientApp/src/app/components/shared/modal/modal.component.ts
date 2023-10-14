import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges,
  ViewChild
} from '@angular/core';
import {identifyDeviceType} from "@util/getDimensionsUtil";
import {SidenavService} from "@shared/side-nav/sidenav.service";

@Component({
  selector: 'app-modal',
  template: `
    <div
      #myModal (click)="closeModal()" [ngClass]="{'modal-tablet': deviceType[0].isEnable,
        'modal-laptop': deviceType[1].isEnable}"
         class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog animate__animated animate__fadeInDown" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{childModalContent.title}} </h5>
            <button class="btn" type="button" aria-label="Close">
              <span aria-hidden="true">X</span>
            </button>
          </div>
          <div class="modal-body">
            {{childModalContent.body}}
          </div>
          <div class="modal-footer">
            <button type="button"
                    [className]="childModalContent.buttonBackground"
                >Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges{

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private _sidenavService: SidenavService
  ) {
  }
  //input properties
  @Input() public childModalContent!: { title: string; body: string; buttonBackground: string };


  //getting element from the DOM
  @ViewChild("myModal") myModal!: ElementRef<HTMLDivElement>;


  //properties
  public sidenavData!: { expanded: string; collapsed: string };
  public sidenavStatus!: boolean;
  public deviceType!: Array<{ deviceType: string; isEnable: boolean }>;
  public isOpen: boolean = false;
  public screenWidth: number = 0;

  //hooks
  ngOnInit(): void {
    this.getStatusSidenav();
    this.isOpen = true;
    this.setClassOnModalBasedOnScreenWidth();
    this.changeDetector.detectChanges();
    this.renderer.setStyle(this.myModal.nativeElement, "display", "block");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getStatusSidenav();
  }

  //event emitters
  @Output() modal: EventEmitter<boolean> = new EventEmitter<boolean>();


  //methods
  closeModal(){
    if(this.isOpen){
      this.isOpen = false;
      this.changeDetector.detectChanges();
      this.modal.emit(this.isOpen)
    }
  }

  public setClassOnModalBasedOnScreenWidth(){
    this.onResize();
  }

  public getStatusSidenav(){
    this._sidenavService
      .getSidenavStatus$()
      .subscribe( (sidenavStatus: boolean) => {
        this.sidenavStatus = sidenavStatus;
        if(sidenavStatus){
          this.renderer.removeClass(this.myModal?.nativeElement,"modal-tablet");
          this.renderer.addClass(this.myModal?.nativeElement,"modal-laptop");
        }
        else{
          this.renderer.removeClass(this.myModal?.nativeElement,"modal-laptop");
          this.renderer.addClass(this.myModal?.nativeElement,"modal-tablet");
        }

      })
  }

  //Event listeners
  @HostListener('window:resize')
  onResize(){
    this.screenWidth = window.innerWidth;
    this.deviceType = identifyDeviceType(this.screenWidth);
    if(this.sidenavStatus){
      this.deviceType[0].isEnable = false;
      this.deviceType[1].isEnable = true;
    }

  }

}
