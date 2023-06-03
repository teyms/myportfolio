import { Component, ElementRef, Renderer2, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VgApiService, VgControlsHiddenService, VgStates, VgUtilsService } from '@videogular/ngx-videogular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('media', { static: true }) mediaElementRef!: ElementRef<HTMLVideoElement>;

  id!: any;
  posterAct:any = false;

  showTimeToolTip = false;
  showHoverTime:any;

  prevVolume:any;

  videoControlSubs: Subscription[] = [];

  // img = new Image();
  // playImage = new Image();
  // image:any;


  // @ViewChild('singleCanvas')
  //   canvas!: HTMLCanvasElement | undefined;
  @ViewChild('singleVideo')
    singleVideo!: ElementRef;


  preload: string = 'auto';
  api: VgApiService = new VgApiService;
  title = 'mediaplayer';

  //onhideVideoControl
  timeout:any;

  //keyup events
  keyToNumber=NaN;

  // json:any;

  // video:any;

  playByPercent = [
    {percent: 0},
    {percent: 10},
    {percent: 20},
    {percent: 30},
    {percent: 40},
    {percent: 50},
    {percent: 60},
    {percent: 70},
    {percent: 80},
    {percent: 90}
  ];

  //video control
   videoText="https://ia800106.us.archive.org/25/items/archive-video-files/test.mp4";

  getLink='';
  // link =''
  poster:any;

  // index=0;
  // posteridx=0;

  pipEnabled: boolean = false;


  constructor(
    private controlsHidden: VgControlsHiddenService,
    private elRef: ElementRef, 
    private renderer: Renderer2,
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
    this.videoControlSubs.forEach(s => s.unsubscribe());
  }



   
  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.prevVolume = this.api.volume;
    this.videoControlSubs.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
  }

  onHideControls(state:boolean) {
    console.log('Are controls hidden?', state);
  }
 
 myLink(link:any){
  this.getLink = (link.target as HTMLInputElement).value
  this.videoText=this.getLink;
  }


  stop(media:any){
    if(this.api.state=="playing"){
      return this.api.pause();
    }
    return this.api.play();
  }

  fullScreen(){
    if(this.api.fsAPI.isFullscreen == false){
      return  this.api.fsAPI.enterElementInFullScreen(this.api.videogularElement);
    }
    return this.api.fsAPI.exit();
  }



  onVideoPlayerDbClick($event:any, $videoPlayerElement:any){
    if(VgUtilsService.isMobileDevice() == true){
      let centerValue = $videoPlayerElement.getBoundingClientRect().right/2;
      //double click onright
      if($event.x >= centerValue + 118){ //right area of video player
        if(this.api.currentTime>=this.api.duration){
          return this.api.currentTime = this.api.duration;
        }
        return ((this.api.currentTime+=5) >= this.api.duration)? this.api.currentTime=this.api.duration: this.api.currentTime;
      }else if ($event.x <= centerValue - 118){ //left area of video player
        if(this.api.currentTime<=0){
          return this.api.currentTime = 0;
        }
        return ((this.api.currentTime-=5) <= 0)? this.api.currentTime=0: this.api.currentTime;      
      } else{ //center of video player
        this.fullScreen();
      }
    } else{
      this.fullScreen();
    }
  }

  onHideVideoControl($videoControlElement:any){
    if(this.api.state == VgStates.VG_PLAYING){
      const element = $videoControlElement;
      element.style.visibility = 'visible';
      if (this.timeout !== undefined) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(function () {
        // trigger the new event on event.target, so that it can bubble appropriately
        element.style.visibility = 'hidden';
      }, 3000);
    }
    
  }

  onOverVideoControl($event:any){
    const element = <HTMLElement> document.getElementsByClassName('hide-control')[0];
    element.style.visibility = 'visible !important';
  }

  showTime(hoverProgressBar:any, event:any){
    if(this.api.canPlay){
      this.showTimeToolTip = true;
    }
  }

  hideTime(hoverProgressBar:any, event:any){
    if(this.api.canPlay){
      this.showTimeToolTip = false;
    }

  }

  
  showSpecificTime(progressbar:any, event:any, hoverProgressBar:any){
    if(this.api.canPlay){
      let scrubBar = this.elRef.nativeElement.querySelector('.scrubBar');

      //calculate time 
      const hoverPosition = (event.clientX - scrubBar.getBoundingClientRect().left) / scrubBar.offsetWidth;
      // hoverProgressBar.style.left = hoverPosition + "%";
      hoverProgressBar.style.left = (event.clientX - scrubBar.getBoundingClientRect().left/2) - 125 + "px";

      //convert to readable time
      this.showHoverTime = moment.utc((this.api.duration * hoverPosition) * 1000).format("HH:mm:ss");
    }
  }

  forward($event:any){
    // this.api.seekTime(2700);
    if(this.api.currentTime>=this.api.duration){
      return this.api.currentTime = this.api.duration;
    }
    return ((this.api.currentTime+=5) >= this.api.duration)? this.api.currentTime=this.api.duration: this.api.currentTime;
  }
  backward($event:any){
    // this.api.seekTime(3594);
    if(this.api.currentTime<=0){
      return this.api.currentTime = 0;
    }
    return ((this.api.currentTime-=5) <= 0)? this.api.currentTime=0: this.api.currentTime;      
  }


  handleKeyboardEvent(event: any) {
    switch (event.key) {
      case 'ArrowLeft':    
        if(this.api.currentTime<=0){      
          return this.api.currentTime = 0;
        }    
        return ((this.api.currentTime-=5) <= 0)? this.api.currentTime=0: this.api.currentTime;
        break;
      case 'ArrowRight':    
        if(this.api.currentTime>=this.api.duration){
          return this.api.currentTime = this.api.duration;
        }
        return ((this.api.currentTime+=5) >= this.api.duration)? this.api.currentTime=this.api.duration: this.api.currentTime;
        break;
      case 'ArrowUp':    
        if(this.api.volume>=1){        
          return this.api.volume=1;
        }
        return ((this.api.volume+=0.1) >= 1)? this.api.volume=1: this.api.volume;
        break;
      case 'ArrowDown':    
        if(this.api.volume<=0){
          return this.api.volume=0;
        }
        return ((this.api.volume-=0.1) < 0.01)? this.api.volume=0: this.api.volume;
        break;
      case ' ':    
        if(this.api.state=="playing"){
          return this.api.pause();
        }
        return this.api.play();
        break;
      case 'f':
      case 'F':      
          return this.fullScreen();
          break;        
      case 'm':
      case 'M':
        if(this.api.volume>0){     
          this.prevVolume = this.api.volume
          return this.api.volume=0;
        }
        return this.api.volume = this.prevVolume;
        break;
          break;        
      default:
        break;
    }

    this.keyToNumber = Number(event.key);
    if(!isNaN(this.keyToNumber)){
      var getPercent = this.playByPercent[this.keyToNumber].percent;
      this.api.seekTime(getPercent, true)
    }

    // let keyclick = {};
    // keyclick[Number(event.key)] = true;
    // if(keyclick['Shift'])
  }  
  // @HostListener('keyup', ['$event'])
  // // //https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   switch (event.key) {
  //     case 'ArrowLeft':
  //       if(this.api.currentTime<=0){
  //         return this.api.currentTime = 0;
  //       }
  //       return ((this.api.currentTime-=5) <= 0)? this.api.currentTime=0: this.api.currentTime;
  //       break;
  //     case 'ArrowRight':
  //       if(this.api.currentTime>=this.api.duration){
  //         return this.api.currentTime = this.api.duration;
  //       }
  //       return ((this.api.currentTime+=5) >= this.api.duration)? this.api.currentTime=this.api.duration: this.api.currentTime;
  //       break;
  //     case 'ArrowUp':
  //       if(this.api.volume>=1){        
  //         return this.api.volume=1;
  //       }
  //       return ((this.api.volume+=0.1) >= 1)? this.api.volume=1: this.api.volume;
  //       break;
  //     case 'ArrowDown':
  //       if(this.api.volume<=0){
  //         return this.api.volume=0;
  //       }
  //       return ((this.api.volume-=0.1) < 0.01)? this.api.volume=0: this.api.volume;
  //       break;
  //     case ' ':
  //       if(this.api.state=="playing"){
  //         return this.api.pause();
  //       }
  //       return this.api.play();
  //       break;
  //       case 'f':
  //       case 'F':
  //         return this.fullScreen();
  //         break;        
  //     default:
  //       break;
  //   }

  //   this.keyToNumber = Number(event.key);
  //   if(!isNaN(this.keyToNumber)){
  //     var getPercent = this.playByPercent[this.keyToNumber].percent;
  //     this.api.seekTime(getPercent, true)
  //   }

  //   // let keyclick = {};
  //   // keyclick[Number(event.key)] = true;
  //   // if(keyclick['Shift'])
  // }  

  public togglePIP() {
    if (!document.pictureInPictureElement) {
      this.mediaElementRef.nativeElement.requestPictureInPicture();
      this.pipEnabled = true;
    } else {
      document.exitPictureInPicture();
      this.pipEnabled = false;
    }
  }





}
