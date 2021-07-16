
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService{

    constructor(private authService: AngularFireAuth){}

    login(email: string, password: string){
            return new Promise((resolve, reject) => {
              this.authService.signInWithEmailAndPassword(email, password)
              .then( datos => resolve(datos),
                      error => reject(error)
              );
            });
    }

    getAuth(){
        return this.authService.authState.pipe(
            map( auth => auth )
        );
    }

    logout(){
      // tslint:disable-next-line: only-arrow-functions
      this.authService.signOut().then(function() {
        // Sign-out successful.
        localStorage.clear();
      // tslint:disable-next-line: only-arrow-functions
      }).catch(function(error) {
        // An error happened.
      });
    }

    // tslint:disable-next-line: use-lifecycle-interface
    ngOnDestroy() {
      this.authService.authState.subscribe();
    }

    registrarse(email: string, password: string){
      return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
        .then(datos => { resolve(datos);
          // this.updateDatos(datos.user)
        }).catch(err => console.log(reject(err)));
      });
    }

}
