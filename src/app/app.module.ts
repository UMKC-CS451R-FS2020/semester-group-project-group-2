import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {transLogComponent} from './transLog/transLog.component';
import { MakeTransComponent } from './make-trans/make-trans.component';
import { NotifyrulesComponent } from './notifyrules/notifyrules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component'
@NgModule({
  declarations: [
    AppComponent,
    transLogComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    HomeComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    transLogComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    HomeComponent]
})
export class AppModule { }
