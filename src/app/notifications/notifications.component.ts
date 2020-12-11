import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Angular2Csv } from 'angular2-csv';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = [
    'Date',
    'Description',
    'State',
    'Amount',
    'Balance After',
    'Balance Before',
    'Vendor',
    'Rules Broken',
    'Type',
  ];
  options: {
    fieldSeparator: ';';
    quoteStrings: '"';
    decimalseparator: '.';
    showLabels: true;
    headers: [];
    useBom: false;
  };

  readonly ROOT_URL = 'http://localhost:3000/users/getNotificationRules/';
  readonly HARD_CODED_NAME = 'Jumbo12';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<any>(
        'http://localhost:3000/transactions/getTransactions/' + 'Jumbo12'
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filteredData.reverse();
        // test comment, TODO: delete comment
      });
  }

  onVoted(agreed: boolean) {
    this.ngOnInit;
  }

  downloadFile() {
    this.http.get<any>(this.ROOT_URL + 'Jumbo12').subscribe((data) => {
      const date: Date = new Date();
      this.dataSource = new MatTableDataSource(data);
      new Angular2Csv(
        this.dataSource._data._value,
        'csv_data_' + date,
        this.options
      );
    });
  }

  title = 'dynamic-mat-table';
  //fetch table cols
  tableCols = ['Date', 'Message', 'amount', 'Balance'];
  //fetch table contents
  tableData = [
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
    {
      Date: '20-10-02',
      Message: 'Deposit Made',
      amount: '$+200.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-04',
      Message: 'Unexpected Out of State Transaction',
      amount: '$-20.00',
      Balance: '$200.00',
    },
    {
      Date: '20-10-06',
      Message: 'Transaction made balance fall below $200',
      amount: '$-10.00',
      Balance: '$190.00',
    },
  ];
}
