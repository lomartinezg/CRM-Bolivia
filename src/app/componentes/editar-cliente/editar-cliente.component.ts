import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

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
    creacion: ''
  };

  id: string;
  fecheActual: string = new Date().toLocaleDateString();

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: {value: Cliente, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // modicar el cliente
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar el activista?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
