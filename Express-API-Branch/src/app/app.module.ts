import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient} from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AddtransactionComponent } from './components/addtransaction/addtransaction.component';
import { ListTransactionsComponent } from './components/listTransactions/list-transactions.component';
import { MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MaterialModule} from './components/material'
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AddtransactionComponent,
    ListTransactionsComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
