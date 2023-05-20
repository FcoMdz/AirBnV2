import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  data!: any;
  usuario = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    usrName: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(5)]),
    gender: new FormControl('', Validators.required),
  });
  sesion = new FormGroup({
    usrNameLog: new FormControl('', [Validators.required]),
    passwdLog: new FormControl('', [Validators.required]),
  });
  passwdConf = new FormControl('', Validators.required);

  usuariosFromLS: any[] = [];

  usuariosObj: Object[] = [];

  localStorageData: any = '';

  fondo = 'linear-gradient(135deg, #71b7e6, #9b59b6)';

  public get name() {
    return this.usuario.get('nombre');
  }

  public get email() {
    return this.usuario.get('email');
  }

  public get usrName() {
    return this.usuario.get('usrName');
  }

  public get telefono() {
    return this.usuario.get('telefono');
  }

  public get passwd() {
    return this.usuario.get('passwd');
  }

  public get gender() {
    return this.usuario.get('gender');
  }

  public get passwdLog() {
    return this.sesion.get('passwdLog');
  }

  public get usrNameLog() {
    return this.sesion.get('usrNameLog');
  }

  procesar() {
    this.usuariosFromLS = [];
    if (document.getElementById('registro')?.classList.contains('habilitado')) {
      this.localStorageData = localStorage.getItem('usuarios');
      console.log(this.localStorageData);

      if (this.localStorageData != null) {
        console.log('Hay datos en el LocalStorage: ', this.localStorageData);

        this.usuariosFromLS.push(JSON.parse(this.localStorageData));

        this.usuariosFromLS.push(this.usuario.value);

        localStorage.setItem('usuarios', JSON.stringify(this.usuariosFromLS));

      } else {
        this.usuariosFromLS.push(this.usuario.value);
        localStorage.setItem('usuarios', JSON.stringify(this.usuariosFromLS));
      }
      Swal.fire(
        'Registro',
        'Se ha registrado correctamente',
        'success'
      );
    } else {
      Swal.fire('Registro', 'Verifique que los datos estén completos', 'error');
    }
  }

  login() {
    if (document.getElementById('inicio')?.classList.contains('habilitado')) {
      this.data = localStorage.getItem('usuarios');
      if (this.data != null) {
        this.data = JSON.parse(this.data);
        let band = false;
        this.data.forEach((user: any) => {
          if (
            user.usrName === this.sesion.value['usrNameLog'] &&
            user.passwd === this.sesion.value['passwdLog']
          ) {
            sessionStorage.setItem('usr', JSON.stringify(user));
            Swal.fire(
              'Inicio de sesión',
              'Se ha iniciado correctamente',
              'success'
            );
            band = true;
          }
        });
        if (!band) {
          Swal.fire('Inicio de sesión', 'Revise sus datos', 'error');
        }
      }else{
        Swal.fire('Inicio de sesión', 'No se ha podido recuperar la base de datos', 'error');
      }
    }else {
      Swal.fire('Inicio de sesión', 'Verifique que los datos estén completos', 'error');
    }
    /*console.log(this.data.usrName);
    console.log(this.sesion.value['usrNameLog']);
    if(this.data.usrName === this.sesion.value['usrNameLog'] && this.data.passwd === this.sesion.value['passwdLog']){
      sessionStorage.setItem('usr',JSON.stringify(this.sesion.value['usrNameLog']));
    }*/
  }

  checkPsswd(): boolean {
    if (this.usuario.get('passwd')?.value === this.passwdConf.value) {
      return true;
    }
    return false;
  }
}
