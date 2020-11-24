import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
<<<<<<< Updated upstream

@NgModule({
  declarations: [
    AppComponent
=======
=======
>>>>>>> Stashed changes
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { MakeTransComponent } from './make-trans/make-trans.component';
import { NotifyrulesComponent } from './notifyrules/notifyrules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

import {ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table/mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListNotificationRulesComponent } from './list-notification-rules/list-notification-rules.component';
import { IconsModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DemoMaterialModule} from '../app/material-module';
import { FormsModule } from '@angular/forms';
import { ListTransactionsComponent } from './list-transactions/list-transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    RegisterComponent,
    HomeComponent,
    TransactionComponent,
    LoginComponent,
    MatTableComponent,
    ListNotificationRulesComponent,
    NavbarComponent,
    ListTransactionsComponent,
    DashboardComponent
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  ],
  imports: [
    DemoMaterialModule,
    IconsModule,
    MatToolbarModule,
    BrowserModule,
<<<<<<< Updated upstream
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
=======
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    MakeTransComponent,
    NotifyrulesComponent,
    NotificationsComponent,
    HomeComponent,
    TransactionComponent,
    LoginComponent]
>>>>>>> Stashed changes
})
export class AppModule { }
