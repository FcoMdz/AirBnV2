import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InversionesService {
  //urlBase:string = "https://api-cvwcbtm6xa-uc.a.run.app";
  urlBase:string = "localhost:3000";
  constructor(public httpClient: HttpClient) {}

  getJSON(url: string) {
    return this.httpClient.get(this.urlBase+url);
  }
}
