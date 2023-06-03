import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, Renderer2, ElementRef, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss']
})
export class EmailTemplateComponent implements OnInit {

  @ViewChild('mothers_day', { static: true }) mothers_day!: TemplateRef<any>;
  @ViewChild('emailContainer', { static: true }) emailContainer!: ElementRef;

  htmlInsert: any;
  iframeUrl?: SafeResourceUrl;

  iframeHeight: number = 300; // Initial height of the iframe container

  isGrabber: boolean = false;

  @ViewChild('iframeContainerRef', { static: true }) iframeContainerRef!: ElementRef;
  // @ViewChild('iframeRef') iframeContainerRef!: HTMLElement;
  // @ViewChild('iframeRef') iframeRef!: HTMLElement;
  @ViewChild('iframeRef', { static: true }) iframeRef!: ElementRef;
  @ViewChild('iframeBoxRef', { static: true }) iframeBoxRef!: ElementRef;
  @ViewChild('grabberRef') grabberRef!: HTMLElement;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    // this.getTemplateHtml();

    //default iframeUrl
    this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://tey-ms.com/email/mothers_day.html');


    // var iframe1 = document.getElementById('iframe') as (HTMLIFrameElement);
    // var y = (iframe1?.contentDocument);
    // y?.body.addEventListener('mousedown', this.onMouseDownGrabber.bind(this));
    // y?.body.addEventListener('mouseup', this.onMouseUpGrabber.bind(this));
    // y?.body.addEventListener('mousemove', this.onMouseMoveGrabber.bind(this));

  }

  ngAfterViewInit(){
    //data send from iframe
    // window.addEventListener('message', this.processMessage);
    window.addEventListener('message', (event) => this.processMessage(event));
  }
  
  processMessage(event:any) {
    var messageType = event.data.type;
    var iframeHeight = event.data.height;
  
    if (messageType === 'iframeHeight') {
      const iframe_container = this.iframeContainerRef.nativeElement;
      console.log(iframeHeight);
      iframe_container.style.height = (iframeHeight + 300).toString() + 'px';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onMouseDownGrabber(event:any){
    this.isGrabber = true;
    const element: HTMLElement = this.iframeRef.nativeElement;
    element.style.pointerEvents = 'none';
    console.log('touch start');
  }

  onMouseUpGrabber(event:any){
    this.isGrabber = false;
    const element: HTMLElement = this.iframeRef.nativeElement;
    element.style.pointerEvents = 'auto';
  }

  onMouseMoveGrabber(event:any){
    if(this.isGrabber){
      if(event.type === 'mousemove'){
        event.preventDefault();
      }
      const iframeElem: HTMLElement = this.iframeRef.nativeElement;
      const iframeBoxElem: HTMLElement = this.iframeBoxRef.nativeElement;
      const rect = iframeElem.getBoundingClientRect();

      //get clientX in diff eventslistener
      const clientX = (event.type === 'mousemove')? event.clientX: event.touches[0].clientX;

      iframeElem.style.width = (clientX-rect.left).toString()+'px';
      iframeBoxElem.style.width = (clientX-rect.left).toString()+'px';
      // element.style.minWidth = (clientX-rect.left).toString()+'px';

    }
  }

  // @HostListener('mousedown') onMouseDown() {
  //   this.isGrabber = true;
  //   const element: HTMLElement = this.iframeRef.nativeElement;
  //   element.style.pointerEvents = 'none';

  // }

  @HostListener('window:mouseup') onMouseUp(event: MouseEvent) {
    this.onMouseUpGrabber(event);
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.onMouseMoveGrabber(event);
  }


  @HostListener('window:touchend') onTouchUp(event: TouchEvent) {
    this.onMouseUpGrabber(event);
    console.log('touch end');
  }

  @HostListener('window:touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    this.onMouseMoveGrabber(event);
  }


  onUpdateIframeUrl(pathName:any){
    this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://tey-ms.com/email/'+pathName+'.html');
  }



  getTemplateHtml() {
    const element = this.renderer.createElement('div');
    const view = this.mothers_day.createEmbeddedView(null);
    this.renderer.appendChild(element, view.rootNodes[0]);

    const htmlCode = element.innerHTML;
    this.renderer.removeChild(element, view.rootNodes[0]);

    console.log(htmlCode);
    this.htmlInsert = htmlCode;
  }
}
