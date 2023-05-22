import { Component, OnInit } from '@angular/core';
import { ApiskinsService } from '../../services/apiskins.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrls: ['./skins.component.css']
})

export class SkinsComponent implements OnInit{
  options:string[]=[];
  SeleccionarOpcion:string="";
  resultados!:any;
  usuarios:string[] = [
    "VEGETTA777",
    "Willyrex",
    "bysTaXx_x",
    "elrubius",
    "xFarganx",
    "ElRichMC",
    "Gerardo12002",
  ]
  constructor(private apiMinecraft:ApiskinsService){
    this.fontSize = 15;
  }
  ngOnInit(){
    this.recuperarDatos();
  }
  recuperarDatos(){
    this.resultados = this.apiMinecraft.retornar(this.usuarios);
  }

  //Para la accesibilidad
  fontSize!: number;
  clasesContrast:string="table table-striped table-hover";
  ContrastInfo:string = "mb-4";
  highContrast(){
    this.clasesContrast = " table table-striped table-hover inverted";
    this.ContrastInfo = "card text-bg-dark mb-4 inverted"

  }
  normalContrast(){
    this.clasesContrast = " table table-striped table-hover";
    this.ContrastInfo = "mb-4";
  }
  decrease(){
    this.fontSize = (this.fontSize * 0.8);
  }

  increase(){
    this.fontSize = (this.fontSize / 0.8);
  }

  reset(){
    this.fontSize = 15;
  }
}
