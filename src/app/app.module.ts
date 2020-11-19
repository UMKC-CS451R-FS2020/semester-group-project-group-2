import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {transLogComponent} from './transLog/transLog.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { MakeTransComponent } from './make-trans/make-trans.component';
import { NotifyrulesComponent } from './notifyrules/notifyrules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component'
import {ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table/mat-table.component';



import { MatTableModule } from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    HomeComponent,
    TransactionComponent,
    LoginComponent,
    MatTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    transLogComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    HomeComponent,
    TransactionComponent,
    LoginComponent]
})
export class AppModule { }
