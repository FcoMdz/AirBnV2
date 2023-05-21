import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';
import { user } from 'src/app/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})

export class RegistroComponent {

  datosUsuario!:user;

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
  fondo = 'linear-gradient(135deg, #71b7e6, #9b59b6)';

  auth:Auth = getAuth();

  constructor(private router: Router, private route:ActivatedRoute){

  }


  procesar(){
    if (document.getElementById('registro')?.classList.contains('habilitado')) {
      let email:string = this.usuario.value.email || "";
      let passwd: string = this.usuario.value.passwd || "";
      if((email || passwd) != ""){
        let button:HTMLInputElement = <HTMLInputElement>document.getElementById("inputRegistro");
        if(button){
          button.innerHTML = `
            <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
            Registrando...
          `;
          button.setAttribute("disabled","true");
        }
        createUserWithEmailAndPassword(this.auth, email, passwd)
          .then(async (userCredential)=>{
            const user = userCredential.user;
            const db = getFirestore();
            try{
              const docRef = await setDoc(doc(db, 'usuarios', user.uid),{
                nombre: this.usuario.value.nombre,
                email: this.usuario.value.email,
                usrName: this.usuario.value.usrName,
                telefono: this.usuario.value.telefono,
                gender: this.usuario.value.gender,
              }).then(()=>{
                Swal.fire(
                  'Registro',
                  'Se ha registrado correctamente, ' + this.usuario.value.nombre,
                  'success'
                ).then(()=>{
                    this.clearForm();
                    this.reactivarBoton(button, "Registrar");
                    this.router.navigate(['home']);
                  }
                );
              });
            }catch(error){
              Swal.fire(
                'Registro',
                'Ha ocurrido un error: ' + error,
                'error'
              ).then(()=>{
                this.reactivarBoton(button, "Registrar");
              });
            }
          })
          .catch((error) => {
            Swal.fire(
              'Registro',
              'Ha ocurrido un error: ' + error.message,
              'error').then(()=>{
                this.reactivarBoton(button, "Registrar");
              });
          });
      }else{
        Swal.fire('Registro', 'Verifique que los datos estén completos', 'error');
      }
    } else {
      Swal.fire('Registro', 'Verifique que los datos estén completos', 'error');
    }
  }

  login(){
    if (document.getElementById('inicio')?.classList.contains('habilitado')) {
      let email:string = this.sesion.value.usrNameLog || "";
      let passwd: string = this.sesion.value.passwdLog || "";
      if((email || passwd) != ""){
        let button:HTMLInputElement = <HTMLInputElement>document.getElementById("inputIniciar");
        if(button){
          button.innerHTML = `
            <span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
            Iniciando sesión...
          `;
          button.setAttribute("disabled","true");
        }
        console.log(button.innerHTML);
        signInWithEmailAndPassword(this.auth, email, passwd)
          .then(async (userCredential)=>{
            const user = userCredential.user;
            const db = getFirestore();
            try{
              await getDoc(doc(db, 'usuarios', user.uid))
              .then((docRef)=>{
                if(docRef.exists()){
                  let datos = docRef.data();
                  this.datosUsuario = {
                    uid: user.uid,
                    nombre: datos["nombre"],
                    email: datos["email"],
                    gender: datos["gender"],
                    telefono: datos["telefono"],
                    usrName: datos["usrName"]
                  }
                  Swal.fire(
                    'Inicio de sesión',
                    'Se ha iniciado correctamente, ' + this.datosUsuario.nombre,
                    'success'
                  ).then(()=>{
                      this.clearSesion();
                      this.reactivarBoton(button, "Iniciar Sesión");
                      this.router.navigate(['home']);
                    }
                  );
                }else{
                  Swal.fire(
                    'Inicio de sesión',
                    'No se ha encontrado el documento del usuario',
                    'error').then(()=>{
                      this.auth.signOut();
                      this.reactivarBoton(button, "Iniciar Sesión");
                    });
                }
              });
            }catch(error){
              Swal.fire(
                'Inicio de sesión',
                'Ha ocurrido un error: ' + error,
                'error').then(()=>{
                  this.reactivarBoton(button, "Iniciar Sesión");
                });
            }
          })
          .catch((error) => {
            Swal.fire(
              'Inicio de sesión',
              'Ha ocurrido un error: ' + error.message,
              'error').then(()=>{
                this.reactivarBoton(button, "Iniciar Sesión");
              });
          });
      }else{
        Swal.fire('Inicio de sesión', 'Verifique que los datos estén completos', 'error');
      }

    }else {
      Swal.fire('Inicio de sesión', 'Verifique que los datos estén completos', 'error');
    }
  }

  reactivarBoton(button:HTMLInputElement, text:string){
    if(button){
      button.innerHTML = `
        ${text}
      `;
    }
    button.removeAttribute("disabled");
  }

  clearForm(){
    this.usuario.reset({
      nombre: "",
      email: "",
      usrName: "",
      telefono: "",
      gender: "",
      passwd: ""
    });
    this.passwdConf.reset('');
  }

  clearSesion(){
    this.sesion.reset({
      usrNameLog: "",
      passwdLog: ""
    })
  }

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
  checkPsswd(): boolean {
    if (this.usuario.get('passwd')?.value === this.passwdConf.value) {
      return true;
    }
    return false;
  }

  /* //Configuracion para almacenamiento local

  usuariosFromLS: any[] = [];
  usuariosObj: Object[] = [];
  localStorageData: any = '';
  data!: any;


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
  }



  */

}
