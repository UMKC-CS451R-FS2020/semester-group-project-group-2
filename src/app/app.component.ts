import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'commerce-bank';
<<<<<<< HEAD
=======
  selection = 'Home';

  onNotify(message:string):void {
    this.selection=message;
  }
>>>>>>> transactionComponent
}
