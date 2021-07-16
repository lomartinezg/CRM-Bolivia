import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ResponsableServicio } from 'src/app/servicios/responsables.service';
import { Responsable } from 'src/app/modelo/responsables.model';

@Component({
  selector: 'app-editar-responsables',
  templateUrl: './editar-responsables.component.html',
  styleUrls: ['./editar-responsables.component.css']
})

export class EditarResponsablesComponent implements OnInit {

  responsable: Responsable = {
    ci: '',
    nombre: '',
    apellido: '',
    movil: '',
    email: '',
    distrito: '',
    habilitado: ''
  };

  id: string;

  constructor(private responsablesServicio: ResponsableServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.responsablesServicio.getResponsable(this.id).subscribe( responsable => {
      this.responsable = responsable;
    });
  }

  guardar({value, valid}: {value: Responsable, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // modicar responsable
      this.responsablesServicio.modificarResponsable(value);
      this.router.navigate(['/responsable']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar al responable?')){
      this.responsablesServicio.eliminarResponsable(this.responsable);
      this.router.navigate(['/responsable']);
    }
  }

}
