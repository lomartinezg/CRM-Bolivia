import { Injectable, Input } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
 })

export class ClienteServicio{
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  @Input() loggeado: string;

  constructor(private db: AngularFirestore,
              public loginService: LoginService){
    // this.getLoggedUser();
  }

  getLoggedUser(){
    // Recuperando usuario logueado
    this.loginService.getAuth().subscribe(auth => {
      this.loggeado = auth.email;
      // console.log('Usuario: ' + `'${this.loggeado}'`);
    });
  }

  getClientes(auth): Observable<Cliente[]>{

    this.loggeado =  auth;

    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('usuario', '==', this.loggeado);
      }
    );
    // Obtener los clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente){

  // Exportacion de datos masivos
    // var masiva: any =
    // [
    //   {nombre:'YRMA TANIA', apellido:'SALVATIERRA', movil:'69394020', ci:'7583275', fecha_nac:'', edad:'', sexo:'', email:'', direccion:'C/ISIBORO FINAL NORTE Z/MOXOS', problema_trinidad:'', problema_personal:'', militante:false, voluntario:true, realiza_actividad:false, intension_voto:'', creacion:'17/8/2020', usuario:'juntos_trinidad@gmail.com'},
    //   {nombre:'YULIANA', apellido:'ZABALA', movil:'69395190', ci:'14062580', fecha_nac:'', edad:'', sexo:'', email:'', direccion:'', problema_trinidad:'', problema_personal:'', militante:false, voluntario:true, realiza_actividad:false, intension_voto:'', creacion:'17/8/2020', usuario:'juntos_trinidad@gmail.com'}
    // ];

    // masiva.forEach(element => {
    //   this.clientesColeccion.add(element);
    // });

    this.clientesColeccion.add(cliente);

  }

  getCliente(id: string){
    this.clienteDoc = this.db.doc<Cliente>(`activista/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion => {
        if (accion.payload.exists === false){
          return null;
        }
        else{
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  getResponsablesEmail(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('email', '==', '');
      }
    );
    // Obtener los email nulos
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getResponsablesMujer(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('sexo', '==', 'F');
      }
    );
    // Obtener las activistas hombres
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getResponsablesHombre(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('sexo', '==', 'M');
      }
    );
    // Obtener las activistas mujeres
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getVoluntario(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('voluntario', '==', true);
      }
    );
    // Obtener las activistas mujeres
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getMilitante(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('militante', '==', true);
      }
    );
    // Obtener las activistas mujeres
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getrRealizaActividad(): Observable<Cliente[]>{
    this.clientesColeccion  = this.db.collection('activista',
      ref => {
        return  ref.where('realiza_actividad', '==', true);
      }
    );
    // Obtener las activistas mujeres
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  modificarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc(`activista/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc(`activista/${cliente.id}`);
    this.clienteDoc.delete();
  }

}
