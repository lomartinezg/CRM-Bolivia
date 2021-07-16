import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conteo } from '../modelo/conteo.model';

@Injectable({
  providedIn: 'root'
 })

export class ConteoServicio{
    conteosColeccion: AngularFirestoreCollection<Conteo>;
    conteoDoc: AngularFirestoreDocument<Conteo>;
    conteos: Observable<Conteo[]>;
    conteo: Observable<Conteo>;

    constructor(private db: AngularFirestore){
      // this.getLoggedUser();
    }

    getConteos(): Observable<Conteo[]>{

      this.conteosColeccion = this.db.collection('totalizacion', ref => ref.orderBy('recinto', 'asc').orderBy('mesa', 'asc'));
      // this.conteosColeccion = this.db.collection('totalizacion');

      // Obtener los centros para totalizar
      this.conteos = this.conteosColeccion.snapshotChanges().pipe(
          map( cambios => {
              return cambios.map( accion => {
                  const datos = accion.payload.doc.data() as Conteo;
                  datos.id = accion.payload.doc.id;
                  return datos;
              });
          })
      );
      return this.conteos;
    }

    agregarConteo(conteo: Conteo){

  // Exportacion de datos masivos
    // var masiva: any =
    // [
    //   {departamento: 'Beni', provincia: 'General José Ballivián', municipio: 'Reyes', asiento: 'Ratije', distrito: 'SIN DISTRITO', zona: 'SIN ZONA', recinto: 'U.E. Ratije', nummesa: '100320842342586601', mesa: '1', electores: '44', votos_canidatoa: '0', votos_canidatob: '0', votos_nulos: '0', usuario: 'juntos_trinidad@gmail.com', fecha_act: '18/8/2020'},
    //   {departamento: 'Beni', provincia: 'Moxos', municipio: 'San Ignacio', asiento: 'San José del Secure', distrito: 'SIN DISTRITO', zona: 'SIN ZONA', recinto: 'U.E. San José del Secure', nummesa: '100320843582606001', mesa: '1', electores: '101', votos_canidatoa: '0', votos_canidatob: '0', votos_nulos: '0', usuario: 'juntos_trinidad@gmail.com', fecha_act: '18/8/2020'}
    // ];

    // masiva.forEach(element => {
    //   this.conteosColeccion.add(element);
    // });

      this.conteosColeccion.add(conteo);
    }

    getConteo(id: string){
      this.conteoDoc = this.db.doc<Conteo>(`totalizacion/${id}`);
      this.conteo = this.conteoDoc.snapshotChanges().pipe(
        map( accion => {
          if (accion.payload.exists === false){
              return null;
          }
          else{
            const datos = accion.payload.data() as Conteo;
            datos.id = accion.payload.id;
            return datos;
          }
        })
      );
      return this.conteo;
    }

    modificarConteo(conteo: Conteo){
        this.conteoDoc = this.db.doc(`totalizacion/${conteo.id}`);
        this.conteoDoc.update(conteo);
    }

    eliminarConteo(conteo: Conteo){
        this.conteoDoc = this.db.doc(`totalizacion/${conteo.id}`);
        this.conteoDoc.delete();
    }
}
