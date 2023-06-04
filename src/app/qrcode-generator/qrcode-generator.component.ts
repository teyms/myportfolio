import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-qrcode-generator',
  templateUrl: './qrcode-generator.component.html',
  styleUrls: ['./qrcode-generator.component.scss']
})
export class QrcodeGeneratorComponent implements OnInit {

  @ViewChild('myCanvas', { static: true }) canvasRef!: any;

  qrCodeData: any;
  qrCodeBackground: any;
  qrCodeColor: any;
  qrCodeWidth: number = 400;

  selectedFile: File | undefined = undefined;
  selectedFileString: string | undefined = undefined;
  
  dragging = false;


  constructor() { }

  ngOnInit(): void {
    //set default
    this.qrCodeData = 'https://tey-ms.com/qrcode';
    this.selectedFileString = 'assets/logo/tms_logo_trans.png';
    this.qrCodeWidth = 400;

  }

  onFileSelected(event:any){
    const file: File = event.target.files[0];
    this.convertToDataURL(file);
  }

  convertToDataURL(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedFileString = reader.result as string;
      this.selectedFile = file;
    };
    reader.readAsDataURL(file);
  }

  // resetFileInput() {
  //   if (this.fileInput) {
  //     this.fileInput.nativeElement.value = ''; // Reset the file input value to empty string
  //   }
  // }

  downloadImage() {
    // const canvas: HTMLCanvasElement = this.canvasRef.nativeElement;

    // const canvas: HTMLCanvasElement = this.canvasRef.qrcElement.nativeElement;
    const canvas: HTMLCanvasElement = this.canvasRef.qrcElement.nativeElement.querySelector('canvas');

    const dataURL = canvas.toDataURL('image/jpeg'); // Replace 'image/jpeg' with the desired image format
    this.triggerDownload(dataURL, 'qrcode.jpg'); // Replace 'canvas-image.jpg' with the desired file name
  }

  triggerDownload(dataURL: string, fileName: string) {
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = fileName;
    link.click();
  }

  onWidthChange(event: any){
    if(isNaN(Number(event)) || event === undefined){
      this.qrCodeWidth = 400;
    }
    else if(event > 700){
      this.qrCodeWidth = 700;
    }
  }

}
