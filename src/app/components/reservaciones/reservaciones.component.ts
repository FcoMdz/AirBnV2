import { EmptyExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { LocalStorageService, casasData } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
  data!:any;
  informacion!:any;
  constructor(){
    this.data =  localStorage.getItem('casasData');
    if(this.data != null){
      this.informacion = JSON.parse(this.data);
    }

  }

  verififcarDatos():boolean{
    if(this.data == null){
      return false;
    }
    return true;
  }
}
