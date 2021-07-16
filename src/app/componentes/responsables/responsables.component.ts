import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ResponsableServicio } from 'src/app/servicios/responsables.service';
import { Responsable } from 'src/app/modelo/responsables.model';

@Component({
  selector: 'app-responsables',
  templateUrl: './responsables.component.html',
  styleUrls: ['./responsables.component.css']
})

export class ResponsablesComponent implements OnInit {

  responsables: Responsable[];
  responsable: Responsable = {
    ci: '',
    nombre: '',
    apellido: '',
    movil: '',
    email: '',
    distrito: '',
    habilitado: ''
  };

  // fecheActual: string = new Date().toLocaleDateString();

  @ViewChild('responsableForm') responsableForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private responsablesServicio: ResponsableServicio,
              private flashMessages: FlashMessagesService) {
  }

  filterPost = '';

  async ngOnInit() {
    this.responsablesServicio.getResponsables().subscribe( responsable => {
      this.responsables = responsable;
    });
  }

  agregar({value, valid}: {value: Responsable, valid: boolean}){
  if (!valid){
    this.flashMessages.show('Por favor llena el formulario correctamente', {
    cssClass: 'alert-danger', timeout: 4000
    });
    }
    else{
      // Agregar la nueva tarea
      this.responsablesServicio.agregarResponsable(value);
      this.responsableForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
