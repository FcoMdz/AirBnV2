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
    const auth:Auth = getAuth();
    let btnRegistro = document.getElementById("inicioSesion");
    if(btnRegistro){
      console.log("hola");
    }
    onAuthStateChanged(auth, (user) => {
      if(user && btnRegistro){
        btnRegistro.innerHTML = "Cerrar sesión";
        btnRegistro.onclick = () => {
          signOut(auth).then(()=>{
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
      }else if(btnRegistro){
        btnRegistro.innerHTML = "Registarse / Inicar Sesión";
        btnRegistro.onclick = ()=>{};
      }
    });
  }
}

