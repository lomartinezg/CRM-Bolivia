import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    ci: '',
    nombre: '',
    apellido: '',
    fecha_nac: '',
    edad: '',
    sexo: '',
    email: '',
    movil: '',
    direccion: '',
    problema_trinidad: '',
    problema_personal: '',
    voluntario: '',
    militante: '',
    realiza_actividad: '',
    intension_voto: '',
    usuario: '',
    creacion: ''
  };

  fecheActual: string = new Date().toLocaleDateString();

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  @Input() loggeado: string;
  @Input() userLogueado: string;

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService) {
    }


  filterPost = '';

  async ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      this.loggeado = auth.email;

      this.clientesServicio.getClientes(auth.email).subscribe(
          clientes => {
            this.clientes = clientes;
          }
        );

    });
    this.getLoggedUser();
  }

  getLoggedUser(){
    // Recuperando usuario logueado
    this.loginService.getAuth().subscribe(auth => {
      this.userLogueado = auth.email;
        // console.log('Usuario: ' + `'${this.usuario}'`);
    });
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      // Agregar el nuevo cliente
      this.getLoggedUser();
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
