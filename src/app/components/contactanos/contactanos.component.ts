import { Component, OnInit } from '@angular/core';
import { SendmailService } from 'src/app/services/sendmail.service';
import { Auth, getAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit{
 constructor(private sendmail:SendmailService){}
 
 auth:Auth = getAuth();
 nombre!:HTMLInputElement;
 apellido!:HTMLInputElement;
 correo!:HTMLInputElement;
 sugerencia!:HTMLTextAreaElement
  ngOnInit(): void {
      this.nombre = <HTMLInputElement>document.getElementById("nombre")!;
      this.apellido = <HTMLInputElement>document.getElementById("apellido")!;
      this.correo = <HTMLInputElement>document.getElementById("correo")!;
      this.sugerencia = <HTMLTextAreaElement>document.getElementById("sugerencia")!;
  }
  EnviarCorreo(){
    if(this.verificarUsr()){
        this.sendCorreo();
        Swal.fire('Gracias por sus comentarios','En la brevedad nos comunicaremos con usted','success');
    }    
    else{
      Swal.fire('Datos incorrectos','Ingrese todos los datos por favor','error');
    }
    this.nombre.innerHTML ="";
    this.apellido.innerHTML ="";
    this.correo.innerHTML ="";
    this.sugerencia.innerHTML ="";
  }
  verificarUsr():boolean{
    if(this.nombre && this.apellido && this.correo && this.sugerencia ) return true;
    return false;
  }

  sendCorreo() {
    let body = {
      usr: this.nombre.value +  " " + this.apellido.value,
      correo: this.correo.value,
      desarrollo: this.sugerencia.value
    }
    this.sendmail.alta(this.sendmail.urlBase+'/contacto',body);
  }
}
