import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';
import { QrcodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch: 'full',
    data: {
      title           : 'Tey MS | Web Developer, Frontend, Backend',
      description     : "Tey-ms portfolio, I am a Web Developer, Frontend, Backend. I also convert design layout to HTML Email Template",
      robots          : 'index,follow',
      og_title        : 'Tey MS | Web Developer, Frontend, Backend',
      og_description  : "Tey-ms portfolio, I am a Web Developer, Frontend, Backend. I also convert design layout to HTML Email Template",
    }
  },
  {
    path: 'emailtemplate', component: EmailTemplateComponent, pathMatch: 'full',
    data: {
      title           : 'Tey MS | Email Template | Email Html',
      description     : 'Email Template or Email Html showcase, able to drag smaller or bigger to view how the Email Resposive in Mobile View and Desktop View',
      robots          : 'index,follow',
      og_title        : 'Tey MS | Email Template | Email Html',
      og_description  : 'Email Template or Email Html showcase, able to drag smaller or bigger to view how the Email Resposive in Mobile View and Desktop View',
    }
  },
  {
    path: 'video', component: VideoPlayerComponent, pathMatch: 'full',
    data: {
      title           : 'Online Video Player',
      description     : 'Online Video Player that able to play mp4, m3u8 video, hls live streming but not limited to these. You just need to paste the link to the Video URL field',
      robots          : 'index,follow',
      og_title        : 'Online Video Player',
      og_description  : 'Online Video Player that able to play mp4, m3u8 video, hls live streming but not limited to these. You just need to paste the link to the Video URL field',
    }
  },
  {
    path: 'video/embed', component: VideoEmbedComponent, pathMatch: 'full',
    data: {
      title           : 'Online Video Player | embed',
      description     : 'Online Video Player that able to play mp4, m3u8 video, hls live streming but not limited to these. You just need to paste the link to the Video URL field',
      robots          : 'index,follow',
      og_title        : 'Online Video Player',
      og_description  : 'Online Video Player that able to play mp4, m3u8 video, hls live streming but not limited to these. You just need to paste the link to the Video URL field',
    }
  },
  {
    path: 'qrcode', component: QrcodeGeneratorComponent, pathMatch: 'full',
    data: {
      title           : 'QR Code Generator',
      description     : 'QR Code Generator that create a qr code for your website or social media link/url. you can customise you qr code and download it as a image',
      robots          : 'index,follow',
      og_title        : 'QR Code Generator',
      og_description  : 'QR Code Generator that create a qr code for your website or social media link/url. you can customise you qr code and download it as a image',
    }
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
