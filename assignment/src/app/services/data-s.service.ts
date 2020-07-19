import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { IData } from '../data';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataSService {

  private _url: string = "https://raw.githubusercontent.com/ishwarikanase/2020-interns/master/data.json";
  constructor(private http: HttpClient) { }

  public getData():Observable<IData[]> {
    return this.http.get<IData[]>(this._url);
  }
}
