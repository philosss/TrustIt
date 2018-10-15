import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ProductPage} from "../pages/product/product";
import { TrustitPage } from "../pages/trustit/trustit";

import { ProductProvider } from '../providers/product/product';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';

import { HttpModule } from '@angular/http';
import {HttpClientModule} from "@angular/common/http";

import { baseUrl } from "../shared/baseUrl";
import { TrustitProvider } from '../providers/trustit/trustit';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    TrustitPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    TrustitPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    { provide: 'BaseURL', useValue: baseUrl },
    ProcessHttpmsgProvider,
    TrustitProvider,
  ]
})
export class AppModule {}
