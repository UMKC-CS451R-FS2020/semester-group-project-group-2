import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifyrules',
  templateUrl: './notifyrules.component.html',
  styleUrls: ['./notifyrules.component.css']
})
export class NotifyrulesComponent implements OnInit {
  constructor(private http: HttpClient) {

  }
  NotificationsForm = new FormGroup({
    Item: new FormControl('', Validators.required),
    Relation: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required)

  })

  NotificationsForm2 = new FormGroup({
    notifyOverdraft: new FormControl(''),
    notifyOutOfState: new FormControl('')

  })

  readonly ROOT_URL = "http://localhost:3000/transactions/newTransaction"

  ngOnInit(): void {
  }

  onSubmit() {
    const newRule = { "typeItem": this.NotificationsForm.value.Item, "Relation": this.NotificationsForm.value.Relation, "Amount": this.NotificationsForm.value.Item };
    console.log(newRule);
    this.http.post(this.ROOT_URL, newRule).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  onSubmit2() {
    const newRule = { "notifyOverdraft": this.NotificationsForm2.value.notifyOverdraft, "notifyOutOfState": this.NotificationsForm2.value.notifyOutOfState };
    console.log(newRule);
    this.http.post(this.ROOT_URL, newRule).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  get transactionNewRule() {
    return this.NotificationsForm.get('Item');
  }
}
