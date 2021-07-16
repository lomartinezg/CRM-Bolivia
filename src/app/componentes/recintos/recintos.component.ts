import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Recinto } from 'src/app/modelo/recinto.model';
import { RecintoServicio } from 'src/app/servicios/recinto.service';

@Component({
  selector: 'app-recintos',
  templateUrl: './recintos.component.html',
  styleUrls: ['./recintos.component.css']
})
export class RecintosComponent implements OnInit {

  recintos: Recinto[];
  recintoT: Recinto = {
    provincia: '',
    municipio: '',
    asiento: '',
    recinto: '',
    mesas: '',
    electores: '',
    delegados: '',
    autoridades_mesas: '',
    fiscal: '',
    testigos: '',
    comando_electoral: '',
    usuario: '',
    creacion: ''
  };

  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private recintosServicio: RecintoServicio,
              private flashMessages: FlashMessagesService) {
    }

  filterPost = '';

  ngOnInit() {
    this.recintosServicio.getRecintos().subscribe(
      recintos => {
          this.recintos = recintos;
        }
    );
  }

  agregar({value, valid}: {value: Recinto, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      // Agregar un nuevo recnto
      this.recintosServicio.agregarRecinto(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
