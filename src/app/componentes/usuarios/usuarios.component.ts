import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsuarioInterface } from 'src/app/modelo/usuario.model';
import { UsuariosServicio } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  usuarios: UsuarioInterface[];
  usuario: UsuarioInterface = {
    nombre: '',
    apellido: '',
    email: ''
  };

  @ViewChild('usuariosAdminForm') usuariosAdminForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  resetForm() {
    this.usuariosAdminForm.reset();
  }

  constructor(private usuariosServicio: UsuariosServicio,
              private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.usuariosServicio.getUsuarios().subscribe(
          usuarios => {
          this.usuarios = usuarios;
        }
    );
  }

  agregar({value, valid}: {value: UsuarioInterface, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
      cssClass: 'alert-danger', timeout: 4000
      });
      }
      else{
        // Agregar la nueva tarea
        this.usuariosServicio.agregarUsuario(value);
        this.resetForm();
        this.cerrarModal();
      }
    }

    private cerrarModal(){
      this.botonCerrar.nativeElement.click();
    }

}
