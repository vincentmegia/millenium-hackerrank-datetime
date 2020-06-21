import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dateTimeObj;
  date: string;
  year: string;

  constructor(private service: ApiService) {}

  ngOnInit() {
    // assign API response to dateTimeObj on loading of application
    this.getDateTime();
  }

  getDateTime() {
    // Use this function to parse the date returned by the API upon button click
    this.service
      .getDateTimeAPI()
      .subscribe(x => {
         let jsonObject = JSON.parse(x.text());
         this.dateTimeObj = new Date(jsonObject.date);
         this.date = this.dateTimeObj;
         this.year = this.dateTimeObj.getFullYear();
         console.log(x.text());
      });
  }
}
