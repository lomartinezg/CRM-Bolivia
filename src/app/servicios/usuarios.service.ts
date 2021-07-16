import { Injectable, Input } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioInterface } from '../modelo/usuario.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
 })

export class UsuariosServicio{
    usuariosColeccion: AngularFirestoreCollection<UsuarioInterface>;
    usuarioDoc: AngularFirestoreDocument<UsuarioInterface>;
    usuarios: Observable<UsuarioInterface[]>;
    usuario: Observable<UsuarioInterface>;

    @Input() loggeado: string;

    constructor(private db: AngularFirestore,
                public loginService: LoginService){ }

    getUsuarios(): Observable<UsuarioInterface[]>{
      this.usuariosColeccion  = this.db.collection('usuarios',
        ref => {
          return  ref.orderBy('email', 'asc');
        }
      );
      // Obtener los usuarios
      this.usuarios = this.usuariosColeccion.snapshotChanges().pipe(
        map( cambios => {
          return cambios.map( accion => {
            const datos = accion.payload.doc.data() as UsuarioInterface;
            datos.id = accion.payload.doc.id;
            return datos;
          });
        })
      );
      return this.usuarios;
    }

    agregarUsuario(usuario: UsuarioInterface){
      this.usuariosColeccion.add(usuario);
    }

    getUsuario(id: string){
      // Obtener lista de usuarios con Id
      this.usuarioDoc = this.db.doc<UsuarioInterface>(`usuarios/${id}`);
      this.usuario = this.usuarioDoc.snapshotChanges().pipe(
          map( accion => {
              if (accion.payload.exists === false){
                  return null;
              }
              else{
                  const datos = accion.payload.data() as UsuarioInterface;
                  datos.id = accion.payload.id;
                  return datos;
              }
          })
      );
      return this.usuario;
    }

    modificarUsuario(usuario: UsuarioInterface){
      this.usuarioDoc = this.db.doc(`usuarios/${usuario.id}`);
      this.usuarioDoc.update(usuario);
    }

    eliminarUsuario(usuario: UsuarioInterface){
      this.usuarioDoc = this.db.doc(`usuarios/${usuario.id}`);
      this.usuarioDoc.delete();
    }

}
