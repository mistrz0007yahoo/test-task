import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableDetails } from './app.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  BASE_URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getFiles():Observable<string[]> {
    return this.http.get(this.BASE_URL + 'files') as Observable<string[]>;
  }

  getTables(file: string):Observable<string[]> {
    return this.http.get(this.BASE_URL + 'tables/' + file) as Observable<string[]>;
  }

  getTableDetails(file: string, table: string):Observable<TableDetails> {
    return this.http.get(this.BASE_URL + 'details/' + file + '/' + table);
  }
}
