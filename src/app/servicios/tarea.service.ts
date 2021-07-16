import { Injectable, Input } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Tarea } from '../modelo/tarea.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';


@Injectable()
export class TareaServicio{
    tareasColeccion: AngularFirestoreCollection<Tarea>;
    tareaDoc: AngularFirestoreDocument<Tarea>;
    tareas: Observable<Tarea[]>;
    tareanew: Observable<Tarea>;

    @Input() loggeado: string;

    constructor(private db: AngularFirestore,
                public loginService: LoginService){ }

    getLoggedUser(){
      // Recuperando usuario logueado
      this.loginService.getAuth().subscribe(auth => {
        this.loggeado = auth.email;
        // cole.log('Usuario: ' + `'${this.loggeado}'`);
      });
    }

    getTareas(auth): Observable<Tarea[]>{

      this.loggeado =  auth;

      this.tareasColeccion  = this.db.collection('tareas',
      ref => {
        // return  ref.where('usuario', '==', this.loggeado).orderBy('fecha_inicio', 'desc');
        return  ref.where('usuario', '==', this.loggeado);
      });
      // Obtener las tareas
      this.tareas = this.tareasColeccion.snapshotChanges().pipe(
        map( cambios => {
          return cambios.map( accion => {
            const datos = accion.payload.doc.data() as Tarea;
            datos.id = accion.payload.doc.id;
            return datos;
          });
        })
      );
      return this.tareas;
    }

    getTareaIni(): Observable<Tarea[]>{

      this.tareasColeccion  = this.db.collection('tareas',
        ref => {
          return  ref.where('estado', '==', 'INICIADA');
        }
      );
      // Obtener las activistas hombres
      this.tareas = this.tareasColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Tarea;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.tareas;
    }

    getTareaCul(): Observable<Tarea[]>{

      this.tareasColeccion  = this.db.collection('tareas',
        ref => {
          return  ref.where('estado', '==', 'CULMINADA');
        }
      );
      // Obtener las activistas hombres
      this.tareas = this.tareasColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Tarea;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.tareas;
    }

    getTareaBlo(): Observable<Tarea[]>{

      this.tareasColeccion  = this.db.collection('tareas',
        ref => {
          return  ref.where('estado', '==', 'BLOQUEADA');
        }
      );
      // Obtener las activistas hombres
      this.tareas = this.tareasColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Tarea;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.tareas;
    }

    agregarTarea(tareanew: Tarea){
    // Agregar la nueva tarea
    // console.log('Servicio: ' + tareanew);
    // var masiva: any = [];
    //   masiva.forEach(tarea => {
    //   this.tareasColeccion.add(tarea);
    // });

    this.tareasColeccion.add(tareanew);
    }

    getTarea(id: string){
      // // Obtener lista de tareas con Id
      this.tareaDoc = this.db.doc<Tarea>(`tareas/${id}`);
      this.tareanew = this.tareaDoc.snapshotChanges().pipe(
          map( accion => {
              if (accion.payload.exists === false){
                  return null;
              }
              else{
                  const datos = accion.payload.data() as Tarea;
                  datos.id = accion.payload.id;
                  return datos;
              }
          })
      );
      return this.tareanew;
    }

    modificarTarea(tareanew: Tarea){
        this.tareaDoc = this.db.doc(`tareas/${tareanew.id}`);
        this.tareaDoc.update(tareanew);
    }

    eliminarTarea(tareanew: Tarea){
        this.tareaDoc = this.db.doc(`tareas/${tareanew.id}`);
        this.tareaDoc.delete();
    }
}
