import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyecto';
  //Busqueda
  termino:HTMLInputElement | undefined;
  busqueda:string = "";

  constructor(private primengConfig: PrimeNGConfig){
    
  }

  ngOnInit(): void {
    //PrimeNG
    this.primengConfig.ripple = true;
    //Busqueda
    this.termino = <HTMLInputElement> document.getElementById("termino")!;
    this.termino.addEventListener("keyup",() => {
      if(this.termino!=undefined){
        this.busqueda = this.termino.value;

      }else{
        this.busqueda = "";
      }
    });
  }
}

