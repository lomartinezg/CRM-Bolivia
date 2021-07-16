import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { UsuariosServicio } from 'src/app/servicios/usuarios.service'

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;
  userAdmin: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio,
              private usuariosServicio: UsuariosServicio) { }

  async ngOnInit() {

  let userAdmin = localStorage.getItem('existe');
    // console.log('Existe = ' + userAdmin);
  // tslint:disable-next-line: triple-equals
  if (localStorage.getItem('existe') == 'true') {
    this.userAdmin = true;
    // console.log('Existe = ' + userAdmin);
  }

  this.loginService.getAuth().subscribe( auth => {
    if (auth){
      this.isLoggedIn = true;
      this.loggedInUser = auth.email;
    }
    else{
      this.isLoggedIn = false;
    }
  });

  this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    });

  }

  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
