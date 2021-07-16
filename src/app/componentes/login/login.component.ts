import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuariosServicio } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  userAdmin: string;

  // tslint:disable-next-line: variable-name
  show_password = false;

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService,
              private usuariosServicio: UsuariosServicio

  ) { }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth){
        this.router.navigate(['/']);
      }
    });
  }

  login(){
    this.loginService.login(this.email, this.password)
      .then( res => {

        // ROles de usuarios administradores
        this.usuariosServicio.getUsuarios().subscribe(
          usuarios => {
          // Creo variable global
          let existe = false;
          usuarios.forEach(element => {
            // tslint:disable-next-line: triple-equals
            if (element.email == this.email){
              existe = true;
              // this.userAdmin = this.email;
            }
          });

          localStorage.setItem('existe', '' + existe);
          // console.log('EL USUAROS EXISTE ?' + existe);
          window.location.href = "/";

          //this.router.navigate(['/']);

        });


      })
      .catch(error => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

 showPassword() {
     this.show_password = !this.show_password;
   }

}
