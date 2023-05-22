import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { PrimeNGConfig } from 'primeng/api';
import { Accessibility } from 'accessibility/dist/main';
import Swal from 'sweetalert2';

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

  auth:Auth = getAuth();

  constructor(private primengConfig: PrimeNGConfig){

  }

  cerrarSesion(){
    signOut(this.auth).then(()=>{
      Swal.fire(
        'Cerrar sesión',
        'Se ha cerrado la sesión',
        'success'
      );
    }).catch((error)=>{
      Swal.fire(
        'Cerrar sesión',
        'Ha ocurrido un error: ' + error,
        'error'
      );
    });
  }

  ngOnInit(): void {
    //PrimeNG
    this.primengConfig.ripple = true;
    //Busqueda
    this.initBusqueda();
    this.initAccessibility();
    this.initUserManage();
  }

  initBusqueda():void{
    this.termino = <HTMLInputElement> document.getElementById("termino")!;
    this.termino.addEventListener("keyup",() => {
      if(this.termino!=undefined){
        this.busqueda = this.termino.value;

      }else{
        this.busqueda = "";
      }
    });
  }

  initUserManage():void{
    let btnRegistro = document.getElementById("inicioSesion");
    let btnCerrar = document.getElementById("cerrarSesion");
    onAuthStateChanged(this.auth, (user) => {
      if(user && btnRegistro && btnCerrar){
        btnRegistro.innerHTML = "Bienvenido, " + this.auth.currentUser?.displayName;
        btnRegistro.setAttribute("disabled", "true");
        btnCerrar.removeAttribute("disabled");
      }else if(btnRegistro && btnCerrar){
        btnRegistro.innerHTML = '<i class="fa-solid fa-user"></i> Iniciar Sesión';
        btnRegistro.removeAttribute("disabled");
        btnCerrar.setAttribute("disabled", "true");
      }
    });
  }

  initAccessibility():void{
    var opt = new Accessibility({
      modules: {
        increaseText: true,
        decreaseText: true,
        invertColors: true,
        increaseTextSpacing: true,
        decreaseTextSpacing: true,
        grayHues: true,
        underlineLinks: false,
        bigCursor: false,
        readingGuide: false,
        textToSpeech: true,
        speechToText: false,
        disableAnimations: false
      },
      language: {
        textToSpeechLang: 'es-MX',
        speechToTextLang: 'es-MX'
      },
      labels:{
        resetTitle: 'Reiniciar',
        closeTitle: 'Cerrar',
        menuTitle: 'Accesibilidad',
        increaseText: 'Aumentar tamaño de letra',
        decreaseText: 'Disminuir tamaño de letra',
        increaseTextSpacing: 'Aumentar espaciado horizontal',
        decreaseTextSpacing: 'Disinuir espaciado horizontal',
        increaseLineHeight: 'Aumentar espaciado vertical',
        decreaseLineHeight: 'Disminuir espaciado vertical',
        invertColors: 'Invertir colores',
        grayHues: 'Escala de Grises',
        underlineLinks: 'Subrayar links',
        bigCursor: ' Cursor más grande',
        readingGuide: 'Guía de lectura',
        textToSpeech:'Texto al habla',
        speechToText: 'Dictado de texto',
        disableAnimations: 'Desabilitar animaciones',
        screenReader: 'Lector de pantalla'
      }
    });
    opt.disableUnsupportedModules();

  }
}

