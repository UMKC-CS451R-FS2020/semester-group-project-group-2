import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-addtransaction',
  templateUrl: './addtransaction.component.html',
  styleUrls: ['./addtransaction.component.css']
})
export class AddtransactionComponent implements OnInit {
  constructor(private http: HttpClient) { 
    
  }
    transactionForm = new FormGroup( {
    vendor: new FormControl(''),
    transactionAmount: new FormControl(''),
    description: new FormControl(''),
    state: new FormControl(''),
    typeOfTransaction: new FormControl('')
  })

  readonly ROOT_URL = "http://localhost:3000/transactions/newTransaction"
  
  ngOnInit(): void {
  }

  onSubmit() {

    let typeconv;
    if (this.transactionForm.value.typeOfTransaction === "Deposit")
    {
      typeconv = "cr";
    }
    else {
      typeconv = "dr";
    }
    const transaction = {"location": this.transactionForm.value.vendor, "state": this.transactionForm.value.state, "typeOfTransaction": typeconv,
    "username": "Jumbo12", "description": this.transactionForm.value.description, "transactionAmount":this.transactionForm.value.transactionAmount};
    console.log(transaction);
    this.http.post(this.ROOT_URL, transaction).subscribe( 
      (res) => console.log(res),
      (err) => console.log(err)
    )

  }

}
