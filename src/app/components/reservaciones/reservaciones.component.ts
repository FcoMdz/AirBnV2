import { EmptyExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/services/casas.service';
import { LocalStorageService, casasData } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit{
  data!:any;
  informacion!:any;
  constructor(private casasService:CasasService){
    
  }

  async ngOnInit() {
    this.data = await this.casasService.consultaApartadosCasas();
  }
  


  verificarDatos():boolean{
    if(this.data == null){
      return false;
    }
    return true;
  }
}
