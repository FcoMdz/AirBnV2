import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  //urlBase:string = "https://api-cvwcbtm6xa-uc.a.run.app";
  //Cambiar en produccion el hosting! (Revisar otros servicios)
  urlBase:string = "localhost:3000";
  constructor(private httpClient:HttpClient) {

   }
   alta(url:string,body:any){
    return this.httpClient.post(url,body).toPromise();
  }
}
