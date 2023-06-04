import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {VgStreamingModule } from '@videogular/ngx-videogular/streaming';
// import { VgHlsModule } from 'ngx-videogular/hls';
import Hls from 'hls.js';

import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app-top-bar/app-top-bar.component';
import { HomeComponent } from './home/home.component';
import { EmailTemplateComponent } from './email-template/email-template.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoEmbedComponent } from './video-embed/video-embed.component';
import { QrcodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    HomeComponent,
    EmailTemplateComponent,
    FooterComponent,
    ContactComponent,
    VideoPlayerComponent,
    VideoEmbedComponent,
    QrcodeGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgStreamingModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
