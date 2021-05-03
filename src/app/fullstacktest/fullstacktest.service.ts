import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullstacktestService {

  constructor(private httpClient: HttpClient) { }

  getGreetings(name: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8050/api/hello/${name}`);
  }
}
