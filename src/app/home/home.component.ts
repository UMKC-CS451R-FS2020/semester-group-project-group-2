import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @Output() newItemEvent = new EventEmitter<string>();

  onClickNav(value: string) {
    this.newItemEvent.emit(value);
  }



}
