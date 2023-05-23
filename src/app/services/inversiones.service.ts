import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InversionesService {

  constructor(public httpClient: HttpClient) {}
  getJSON(url: string) {
    let base = "https://nodejs-vegetta777-gerardo1209.onrender.com"
    return this.httpClient.get(`${base}/${url}`);
  }
}
