import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Responsable } from '../modelo/responsables.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ResponsableServicio{
    responsabesColeccion: AngularFirestoreCollection<Responsable>;
    responsabeDoc: AngularFirestoreDocument<Responsable>;
    responsabes: Observable<Responsable[]>;
    responsabe: Observable<Responsable>;

    constructor(private db: AngularFirestore){
    }

    getResponsables(): Observable<Responsable[]>{
      this.responsabesColeccion  = this.db.collection('responsables',
        ref => {
          // return  ref.where('habilitado', '==', true).orderBy('nombre', 'asc');
          return  ref.orderBy('nombre', 'asc');
        }
      );
      // Obtener los responsable
      this.responsabes = this.responsabesColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Responsable;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.responsabes;
    }

    getResponsablesAct(): Observable<Responsable[]>{
      this.responsabesColeccion  = this.db.collection('responsables',
        ref => {
          return  ref.where('habilitado', '==', true).orderBy('nombre', 'asc');
          // return  ref.orderBy('nombre', 'asc');
        }
      );
      // Obtener los responsable
      this.responsabes = this.responsabesColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Responsable;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.responsabes;
    }

    agregarResponsable(responsabe: Responsable){

      // Exportacion de datos masivos
      // var masiva: any =
      // [
      //   {ci: '11111111', nombre: 'SOFIA', apellido: 'CIVIDANES', movil: '80801212', email: 'sofiacividanes29@gmail.com', distrito: 'CABA', habilitado: true},
      //   {ci: '22222222', nombre: 'LUIS OMAR', apellido: 'MARTINEZ', movil: '26409606', email: 'lomartinez7@hotmail.com', distrito: 'CABA', habilitado: true},
      // ];
      // masiva.forEach(element => {
      //   this.responsabesColeccion.add(element);
      // });

      this.responsabesColeccion.add(responsabe);

    }

    getResponsable(id: string){
      this.responsabeDoc = this.db.doc<Responsable>(`responsables/${id}`);
      this.responsabe = this.responsabeDoc.snapshotChanges().pipe(
        map( accion => {
          if (accion.payload.exists === false){
              return null;
          }
          else{
            const datos = accion.payload.data() as Responsable;
            datos.id = accion.payload.id;
            return datos;
          }
        })
      );
      return this.responsabe;
    }

    modificarResponsable(responsabe: Responsable){
        this.responsabeDoc = this.db.doc(`responsables/${responsabe.id}`);
        this.responsabeDoc.update(responsabe);
    }

    eliminarResponsable(responsabe: Responsable){
        this.responsabeDoc = this.db.doc(`responsables/${responsabe.id}`);
        this.responsabeDoc.delete();
    }
}
