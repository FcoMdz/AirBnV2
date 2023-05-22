import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { max, retry } from 'rxjs';
import { Casa, CasasService } from 'src/app/services/casas.service';
import { LocalStorageService, casasData } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
import * as L from 'leaflet';
import { getFirestore, collection } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.css'],
})
export class CasaComponent implements OnInit, AfterViewInit {
  i:number[] = [];
  minDate: Date = new Date();
  tmpDate: Date = new Date();
  maxDate: Date = new Date(this.tmpDate.setMonth(this.tmpDate.getMonth() + 12));
  rangeDates: Date[] = [this.minDate, this.minDate];
  reserva!:FormGroup;
  casa: Casa = {id: 0,
    nombre: "",
    precio: 0,
    rutaImg: [""],
    carpetaImg: "",
    descripcion:"",
    categoria:"",
    maxPersonas: 0,
    tags: [],
    ubicacion: {name:"",code:""}
  };
  fechaActual = new Date();
  fecha:string = "";
  diasdesh:Date[]=[];

  auth:Auth = getAuth();

  ///////////////////Geras mapa
  private mapa!:L.Map;
  private tiles!:any;
  ngAfterViewInit(): void {
    this.mapa = L.map('map',{
      center: [51.505, -0.09],
      zoom: 13
    });
    this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    this.tiles.addTo(this.mapa);
  }

  ///////////////////Fin Geras mapa

  constructor(private casaService:CasasService, private rutaActiva:ActivatedRoute){
    this.casaService.casas.forEach(casita => {
      if(casita.nombre === this.rutaActiva.snapshot.params['casa']){
        this.casa = {
          id: casita.id,
          nombre: casita.nombre,
          precio: casita.precio,
          rutaImg: casita.rutaImg,
          carpetaImg: casita.carpetaImg,
          descripcion:casita.descripcion,
          categoria:casita.categoria,
          maxPersonas: casita.maxPersonas,
          tags: casita.tags,
          ubicacion: casita.ubicacion
        }
      }

    });
  }

  actualizarFechasDisponibles():void{
    let infoCasas:casasData[];
    if(localStorage.getItem("casasData") != null){
      infoCasas = JSON.parse(localStorage.getItem('casasData') || "{}");
      infoCasas.forEach(apartado => {
        if(apartado.id == this.casa.id){
          let fechas:Date[] = [];
          let fechaInicio = new Date(apartado.fechaInicio);
          let fechaFinal = new Date(apartado.fechaFinal);
          while(fechaInicio <= fechaFinal){
            fechas.push(new Date(fechaInicio));
            fechaInicio.setDate(fechaInicio.getDate()+1);
          }
          this.diasdesh = this.diasdesh.concat(fechas);
        }
      });
    }
  }

  ngOnInit(){
    this.actualizarFechasDisponibles();
    this.fecha = this.fechaActual.toLocaleString( );
    this.casaService.casas.forEach(casita => {
      if(casita.nombre === this.rutaActiva.snapshot.params['casa']){
        this.casa = {
          id: casita.id,
          nombre: casita.nombre,
          precio: casita.precio,
          rutaImg: casita.rutaImg,
          carpetaImg:casita.carpetaImg,
          descripcion:casita.descripcion,
          categoria:casita.categoria,
          maxPersonas: casita.maxPersonas,
          tags: casita.tags,
          ubicacion: casita.ubicacion
        }
      }
    });
    this.reserva = new FormGroup({
      'fecha': new FormControl('',[Validators.required]),
      'CantidadPersona' : new FormControl('1',[Validators.required])
    });
    this.validadCiclo();

  }


  validadCiclo():void{
    for(let a = 1; a <= this.casa.maxPersonas; a++ ){
      this.i[a-1]=a-1;
    }
  }

  registrarReserva():void{
    //Aqui se obtienen las fechas que selecciono el usuario
    if(this.verificarUsr()){
      let fechaSeleccionadaInicio:string;
      let fechaSeleccionadaFinal:string;
      let horaSeleccionadaInicio:string;
      let horaSeleccionadaFinal:string;
      if(this.reserva.value.fecha[1] == null){
        fechaSeleccionadaInicio = this.reserva.value.fecha[0].toDateString();
        fechaSeleccionadaFinal = this.reserva.value.fecha[0].toDateString();
        horaSeleccionadaInicio = this.reserva.value.fecha[0].toTimeString();
        horaSeleccionadaFinal = this.reserva.value.fecha[0].toTimeString();
      }else{
        fechaSeleccionadaInicio = this.reserva.value.fecha[0].toDateString();
        fechaSeleccionadaFinal = this.reserva.value.fecha[1].toDateString();
        horaSeleccionadaInicio = this.reserva.value.fecha[0].toTimeString();
        horaSeleccionadaFinal = this.reserva.value.fecha[1].toTimeString();
      }
    }


      //NOTA: hay que hacer dinámica la seleccion de fechas y comprobar que sea correcto
      /*let infoCasas:casasData[];
      let casaAgregar:casasData = {
        usr: this.usuario.nombre,
        id: this.casa.id,
        personas: this.reserva.value.CantidadPersona,
        precio: this.casa.precio,
        fechaInicio: fechaSeleccionadaInicio,
        fechaFinal: fechaSeleccionadaFinal,
        horaInicio: horaSeleccionadaInicio,
        horaFinal: horaSeleccionadaFinal
      };
      if(localStorage.getItem("casasData") === null){
        infoCasas = [];
        infoCasas.push(casaAgregar);
        Swal.fire('Apartado Confirmado','Se ha registrado su apartado','success');
      }else{
        infoCasas = JSON.parse(localStorage.getItem('casasData') || "{}");
        let band = false;
        infoCasas.forEach(apartado => {
          if(apartado.id == this.casa.id){
            let fechaInicio = new Date(apartado.fechaInicio);
            let fechaFinal = new Date(apartado.fechaFinal);
            let fechaNuevaInicio = new Date(fechaSeleccionadaInicio);
            let fechaNuevaFinal = new Date(fechaSeleccionadaFinal);
            if(fechaFinal >= fechaNuevaInicio && fechaInicio <= fechaNuevaFinal){
              band = true;
            }
          }
        });

        if(band){
          Swal.fire('Error','Ha ocurrido un error al verificar las fechas, revise que su seleccion este habilitada','error');
        }else{
          infoCasas.push(casaAgregar);
          Swal.fire('Apartado Confirmado','Se ha registrado su apartado','success');
        }
      }
      localStorage.setItem('casasData',JSON.stringify(infoCasas));
      this.actualizarFechasDisponibles();
    }else{
      Swal.fire('Inicio Sesión','Debe iniciar sesión para registrar una reserva','error');
    }*/

  }

  verificarUsr():boolean{
    if(this.auth.currentUser) return true;
    return false;
  }

}
