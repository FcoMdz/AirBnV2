import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { PrimeNGConfig } from 'primeng/api';
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
    this.termino = <HTMLInputElement> document.getElementById("termino")!;
    this.termino.addEventListener("keyup",() => {
      if(this.termino!=undefined){
        this.busqueda = this.termino.value;

      }else{
        this.busqueda = "";
      }
    });
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
}

