import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list-notification-rules',
  templateUrl: './list-notification-rules.component.html',
  styleUrls: ['./list-notification-rules.component.scss']
})
export class ListNotificationRulesComponent implements OnInit {

  constructor(private http: HttpClient) { }
  readonly HARD_CODED_URL = 'http://localhost:3000/users/getNotificationRules/Jumbo12';
  readonly HARD_CODED_REMOVE_URL = 'http://localhost:3000/users/removeNotificationRule/Jumbo12';

  editField: string;
  notificationList: Array<any> = [

  ];

  ngOnInit(){
    this.http.get(this.HARD_CODED_URL).subscribe(
      (res) => this.pushItems(res),
      (err) => console.log('Error: ' + err)
    );
  }

  pushItems(res)
  {
    res.notificationRulesRelations.map(a => this.parseItemsRelations(a, this.notificationList));
    this.parseItemsState(res.notificationRulesState, this.notificationList);
    this.parseItemsTime(res.notificationRulesTimes, this.notificationList);
  }

  parseItemsState(obj, list)
  {
    const a = {
      id: 1,
      Type: 'State',
      Relation: 'Outside of',
      Amount: obj
    };
    list.push(a);
  }

  parseItemsRelations(obj, list)
  {
    const a = {
      id: 1,
      Type: obj.typeItem,
      Relation: obj.overUnderSame,
      Amount: obj.transAmount
    };
    list.push(a);
  }

  parseItemsTime(obj, list)
  {
    let timeString = '';
    if (obj.fromTime != undefined)
    {
      timeString = obj.fromTime + ' - ' + obj.toTime;
    }
    const a = {
      id: 1,
      Type: 'Time',
      Relation: 'Within',
      Amount: timeString
    };
    list.push(a);
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.notificationList[id][property] = editField;
  }

  remove(id: any) {
    const obj = this.notificationList[id];
    let body = {

    };
    if (obj.Type === 'Withdrawal' || obj.Type === 'Deposit' || obj.Type === 'Balance')
    {
      body = {
        amount : this.notificationList[id].Amount,
        typeItem : this.notificationList[id].Type,
        relation : this.notificationList[id].Relation
      };
    }
    else if (obj.Type === 'State')
    {
      body = {
        typeItem : 'State',
        amount: obj.Amount
      };
    }
    else if (obj.Type === 'Time')
    {
      const firststring = obj.Amount.substr(0, 4);
      const secondstring = obj.Amount.substr(8, 12);
      const combined = {
        fromTime: firststring, toTime: secondstring
      };
      body = {
        typeItem : 'Time',
        amount: combined
      };
    }


    this.http.put(this.HARD_CODED_REMOVE_URL, body).subscribe(
      (res) => {console.log(res); this.notificationList.splice(id, 1); },
      (err) => console.log('Error: ' + err)
    );

  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
