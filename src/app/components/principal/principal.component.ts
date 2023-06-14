import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Casa, CasasService } from 'src/app/services/casas.service';


@Component({
  selector: 'boot-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  link: string="AMWvGHsD4rA";
  casas:Casa [];
  mostrar:Casa [] = [];
  constructor (public casasService: CasasService){
     this.casas = casasService.casas;
  }
  ngOnInit(): void {
    let numeros:number[] = []

    for(let i=0;i<5;i++){
      numeros[i]=Math.floor(Math.random() * 8);
      if(i>0){
        while(numeros[i-1] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
      }
      if(i>1){
        while(numeros[i-1] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-2] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
      }
      if(i>2){
        while(numeros[i-1] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-2] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-3] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
      }
      if(i>2){
        while(numeros[i-1] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-2] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-3] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
        while(numeros[i-4] === numeros[i]){
          numeros[i]=Math.floor(Math.random() * 8);
        }
      }
    }
    for(let i=0;i<5;i++){
      this.mostrar[i]=this.casas[numeros[i]];
    }
  }
}
