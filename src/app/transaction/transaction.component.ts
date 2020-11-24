import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {}

  title = 'dynamic-mat-table';
  //fetch table cols
  tableCols = ['Date', 'Type', 'Amount', 'Vendor', 'State', 'Balance'];
  //fetch table contents
  tableData = [
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
    {
      Date: '20-10-02',
      Type: 'Deposit Made',
      Amount: '$+200.00',
      Vendor: '$200.00',
      State: 'MO',
      Balance: '1000'
    },
  ];
}
