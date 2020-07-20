import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IData } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesAPIService {

  private _url: string = "https://api.exchangeratesapi.io/history?start_at=2019-01-01&end_at=2019-12-31";
  private current_url: string = "https://api.exchangeratesapi.io/latest?base=USD";

  constructor(private http: HttpClient) { }

  public getData(): Observable<IData[]> {
    return this.http.get<IData[]>(this._url);
  }
  public getLatestData(): Observable<IData[]> {
    return this.http.get<IData[]>(this.current_url);
  }
}
