import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getDateTimeAPI(): Observable<Response> {
    // Call the API and return the response (change the code below)
    return this.http.get('https://jsonmock.hackerrank.com/datetime');
  }
}
