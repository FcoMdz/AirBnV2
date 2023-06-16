import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  getFirestore,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css'],
})
export class MiembrosComponent implements OnInit {
  usuarios: any[] = [];

  constructor() {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    const db: Firestore = getFirestore();
    const usuariosRef = collection(db, 'usuarios');
    const usuariosSnapshot = await getDocs(usuariosRef);
    this.usuarios = usuariosSnapshot.docs.map((doc) => doc.data());
  }
}
