import { Injectable, Input } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recinto } from '../modelo/recinto.model';

@Injectable({
  providedIn: 'root'
 })

export class RecintoServicio{
  recintosColeccion: AngularFirestoreCollection<Recinto>;
  recintoDoc: AngularFirestoreDocument<Recinto>;
  recintos: Observable<Recinto[]>;
  recinto: Observable<Recinto>;

  constructor(private db: AngularFirestore){
    // this.getLoggedUser();
  }

  getRecintos(): Observable<Recinto[]>{

    this.recintosColeccion = this.db.collection('recintos');

    // Obtener los recintos
    this.recintos = this.recintosColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Recinto;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.recintos;
  }

  agregarRecinto(recinto: Recinto){

  // Exportacion de datos masivos
    // var masiva: any =
    // [
    //   {provincia: 'Cercado', municipio: 'SAN JAVIER', asiento: 'Villa Rodeo', recinto: 'U.E. Villa Rodeo', mesas: '1', electores: '142', delegados: '', autoridades_mesas: '', fiscal: '', testigos: '', comando_electoral: '', hora: '', usuario: 'juntos_trinidad@gmail.com', creacion: '11/8/2020'}
    // ];

    // masiva.forEach(element => {
    //   this.recintosColeccion.add(element);
    // });

    // this.recintosColeccion.add(recinto);

  }

  getRecinto(id: string){
    this.recintoDoc = this.db.doc<Recinto>(`recintos/${id}`);
    this.recinto = this.recintoDoc.snapshotChanges().pipe(
      map( accion => {
        if (accion.payload.exists === false){
          return null;
        }
        else{
          const datos = accion.payload.data() as Recinto;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.recinto;
  }

  modificarRecinto(recinto: Recinto){
    this.recintoDoc = this.db.doc(`recintos/${recinto.id}`);
    this.recintoDoc.update(recinto);
  }

  eliminarRecinto(recinto: Recinto){
    this.recintoDoc = this.db.doc(`recintos/${recinto.id}`);
    this.recintoDoc.delete();
  }

}
