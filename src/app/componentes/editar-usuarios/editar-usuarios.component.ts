import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsuariosServicio } from 'src/app/servicios/usuarios.service';
import { UsuarioInterface } from 'src/app/modelo/usuario.model';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  usuarios: UsuarioInterface[];
  usuario: UsuarioInterface = {
    nombre: '',
    apellido: '',
    email: ''
  };

  id: string;

  constructor(private usuariosServicio: UsuariosServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.usuariosServicio.getUsuario(this.id).subscribe( usuario => {
      this.usuario = usuario;
    });
  }

  guardar({value, valid}: {value: UsuarioInterface, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // modicar usuarios
      this.usuariosServicio.modificarUsuario(value);
      this.router.navigate(['/usuario']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar al responable?')){
      this.usuariosServicio.eliminarUsuario(this.usuario);
      this.router.navigate(['/usuario']);
    }
  }

}
