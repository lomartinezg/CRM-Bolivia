import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConteoServicio } from 'src/app/servicios/conteo.service';
import { Conteo } from 'src/app/modelo/conteo.model';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-conteo',
  templateUrl: './conteo.component.html',
  styleUrls: ['./conteo.component.css']
})
export class ConteoComponent implements OnInit {

  conteos: Conteo[];
  conteo: Conteo = {
    provincia: '',
    municipio: '',
    asiento: '',
    distrito: '',
    recinto: '',
    mesa: '',
    electores: '',
    votos_canidatoa: '',
    votos_canidatob: '',
    votos_nulos: '',
    contado: ''
  };

  @ViewChild('conteoForm') conteoForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;

  constructor(private conteosServicio: ConteoServicio,
              private flashMessages: FlashMessagesService
    ) { }

  filterPost = '';

  ngOnInit() {
    this.conteosServicio.getConteos().subscribe(
      conteos => {
        this.conteos = conteos;
      }
    );
  }

  agregar({value, valid}: {value: Conteo, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      // Agregar el nuevo centro de votación
      this.conteosServicio.agregarConteo(value);
      this.conteoForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}
