import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FlagsService {

  private url = environment.URLApi;

  constructor(private _http: HttpClient) { }

  getAllFlags() {
    return this._http.get(`${this.url}all`);
  }

  getFlag(name: string) {
    return this._http.get(`${this.url}name/${name}`);
  }
}
