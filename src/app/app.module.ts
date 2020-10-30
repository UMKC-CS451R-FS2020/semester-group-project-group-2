import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {transLogComponent} from './transLog/transLog.component';
import { MakeTransComponent } from './make-trans/make-trans.component';
import { NotifyrulesComponent } from './notifyrules/notifyrules.component';
import { NotificationsComponent } from './notifications/notifications.component'
@NgModule({
  declarations: [
    AppComponent,
    transLogComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
