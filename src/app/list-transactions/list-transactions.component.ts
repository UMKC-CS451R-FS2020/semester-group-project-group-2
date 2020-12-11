import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Angular2Csv} from 'angular2-csv';

export interface TransactionTable{
  Vendor: string;
  Amount: number;
  Type: string;
  Description: string;
  State: string;
}

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.component.html',
  styleUrls: ['./list-transactions.component.css'],
})
export class ListTransactionsComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['Date', 'Description', 'State', 'Amount', 'Balance After', 'Balance Before', 'Vendor', 'Rules Broken', 'Type'];
  options: {
    fieldSeparator: ';',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    headers: [],
    useBom: false
  };

  constructor(private http: HttpClient) {
  }

  readonly ROOT_URL = 'http://localhost:3000/transactions/getTransactions/';

  ngOnInit(): void {
    this.http.get<any>(this.ROOT_URL + 'Jumbo12').subscribe(data => {
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.filteredData.reverse();
      //console.log(this.dataSource._data._value);
      this.dataSource._data._value.map(num => {
        if (num.transactionRulesBroken.length != 0)
        {
          num.transactionRulesBroken = JSON.stringify(num.transactionRulesBroken);
        }

      }
      );
      // test comment, TODO: delete comment
      //console.log(this.dataSource._data._value);
    });
  }

  // tslint:disable-next-line:typedef
  downloadFile() {
    this.http.get<any>(this.ROOT_URL + 'Jumbo12').subscribe(data => {
      const date: Date = new Date();
      this.dataSource = new MatTableDataSource(data);
      new Angular2Csv(this.dataSource._data._value, 'csv_data_' + date, this.options);
    });
  }
}

