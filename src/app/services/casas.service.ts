import { Injectable } from '@angular/core';
import { getFirestore, getDocs, Firestore, collection, query, where, setDoc, CollectionReference, doc, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CasasService {

  db:Firestore = getFirestore();
  collection:CollectionReference = collection(this.db,'casas');

  async consultaFechasCasas(idCasa:number){
    let referencia = collection(this.collection, idCasa.toString(), 'apartado');
    let apartados = await getDocs(referencia);
    let fechas:[Date[]] = [[]];
    apartados.forEach((apartado:any) => {
      let data = apartado.data();
      let rangoFecha = [new Date(data.fechaInicio), new Date(data.fechaFinal)];
      fechas.push(rangoFecha);
    })
    fechas.shift();
    return fechas;
  }

  async ingresarFechasCasas(idCasa:number, fechaInicio:Date, fechaFinal:Date, uid:string, cantPersonas:number, precio:number){
    let data = {
      fechaInicio: fechaInicio.toISOString(),
      fechaFinal: fechaFinal.toISOString(),
      uid: uid,
      cantPersonas: cantPersonas,
      precio: precio
    }
    let referencia = collection(this.collection, idCasa.toString(), 'apartado');
    await addDoc(referencia, data);
  }

  casas:Casa [] = [

    { id: 1,
      nombre: "Casa 1",
      precio:100000,
      rutaImg:[ "casa1.jpg",
                "casa1.1.jpg",
                "casa1.2.jpg",
                "casa1.3.jpg"],
      carpetaImg:"casa1",
      descripcion:"Esta casa tiene bastante que ofrecer",
      categoria: "Casa grande",
      maxPersonas: 5,
      tags: ["Rural","Actividades", "Campo"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },

     {
      id: 2,
      nombre: "Casa 2",
      precio: 300000,
      rutaImg:[ "casa2.jpg",
                "casa2.1.jpg",
                "casa2.2.jpg",
                "casa2.3.jpg",
                "casa2.4.jpg",
                "casa2.5.jpg"],
      carpetaImg:"casa2",
      descripcion: "Es una casa de prueba",
      categoria: "Casa grande",
      maxPersonas: 10,
      tags: ["Ciudad","Centro comercial"],
      ubicacion: {name: "Guanajuato", code: "GTO"}
     },
     {
      id: 3,
      nombre: "Casa 3",
      precio: 200000,
      rutaImg:[ "casa3.jpg",
                "casa3.1.jpg",
                "casa3.2.jpg",
                "casa3.3.jpg",
                "casa3.4.jpg"],
      carpetaImg:"casa3",
      descripcion: "Es una casa de prueba",
      categoria: "Casa grande",
      maxPersonas: 3,
      tags: ["Mar","Playa"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
     {
      id: 4,
      nombre: "Casa 4",
      precio: 150000,
      rutaImg:[ "casa4.jpg",
                "casa4.1.jpg",
                "casa4.2.jpg",
                "casa4.3.jpg",
                "casa4.4.jpg",
                "casa4.5.jpg",
                "casa4.6.jpg",
                "casa4.7.jpg",],
      carpetaImg:"casa4",
      descripcion: "Es una casa de prueba",
      categoria: "Casa grande",
      maxPersonas: 7,
      tags: ["Bosque","Libre"],
      ubicacion: {name: "Ciudad de México", code:"CDMX"}
     },
     {
      id: 5,
      nombre: "Casa 5",
      precio: 150000,
      rutaImg:[ "casa5.jpg",
                "casa5.1.jpg",
                "casa5.2.jpg",
                "casa5.3.jpg",],
      carpetaImg:"casa5",
      descripcion: "Es una casa de prueba",
      categoria: "Casa grande",
      maxPersonas: 7,
      tags: ["Bosque","Libre"],
      ubicacion: {name: "Ciudad de México", code:"CDMX"}
     },
     {
      id: 6,
      nombre: "Casa 6",
      precio: 200000,
      rutaImg:[ "casa6.jpg",
                "casa6.1.jpg",
                "casa6.2.jpg",
                "casa6.3.jpg",
                "casa6.4.jpg",
                "casa6.5.jpg",],
      carpetaImg:"casa6",
      descripcion: "Es una casa de prueba",
      categoria: "Casa grande",
      maxPersonas: 3,
      tags: ["Mar","Playa","Vista"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
     { id: 7,
      nombre: "Casa 7",
      precio:100000,
      rutaImg:[ "casa7.jpg",
                "casa7.1.jpg",
                "casa7.2.jpg",
                "casa7.3.jpg",
                "casa7.4.jpg",
                "casa7.5.jpg",],
      carpetaImg:"casa7",
      descripcion:"Esta casa tiene bastante que ofrecer",
      categoria: "Casa grande",
      maxPersonas: 5,
      tags: ["Rural","Actividades", "Campo"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
     { id: 8,
      nombre: "Casa 8",
      precio:10000,
      rutaImg:[ "casa8.jpg",
                "casa8.1.jpg",
                "casa8.2.jpg",
                "casa8.3.jpg",
                "casa8.4.jpg",],
      carpetaImg:"casa8",
      descripcion:"Esta casa tiene bastante que ofrecer",
      categoria: "Casa grande",
      maxPersonas: 5,
      tags: ["Rural","Actividades", "Campo"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
     { id: 9,
      nombre: "Casa 9",
      precio:100000,
      rutaImg:[ "casa9.jpg",
                "casa9.1.jpg",
                "casa9.2.jpg",
                "casa9.3.jpg",],
      carpetaImg:"casa9",
      descripcion:"Esta casa tiene bastante que ofrecer",
      categoria: "Casa grande",
      maxPersonas: 5,
      tags: ["Rural","Actividades", "Campo"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
     { id: 10,
      nombre: "Casa 10",
      precio:100000,
      rutaImg:[ "casa10.jpg",
                "casa10.1.jpg",
                "casa10.2.jpg",
                "casa10.3.jpg"],
      carpetaImg:"casa10",
      descripcion:"Esta casa tiene bastante que ofrecer",
      categoria: "Casa grande",
      maxPersonas: 5,
      tags: ["Rural","Actividades", "Campo"],
      ubicacion: {name: "Aguascalientes", code: "AGS"}
     },
  ];
  constructor() { }


}
export interface Casa {
  id:number;
  nombre:string;
  precio:number;
  rutaImg:string[];
  carpetaImg:string;
  descripcion:string;
  categoria:string;
  maxPersonas:number;
  tags: string[];
  ubicacion: Bioma;
}

export interface Bioma {
  name: string;
  code: string;
}
