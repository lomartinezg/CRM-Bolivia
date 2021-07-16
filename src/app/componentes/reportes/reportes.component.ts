import { Component, OnInit } from '@angular/core';
import { ExcelService } from './../../servicios/sharedServices';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Tarea } from 'src/app/modelo/tarea.model';
import { TareaServicio } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})

export class ReportesComponent implements OnInit {

  clientes: Cliente[];
  clientesH: Cliente[];
  clientesM: Cliente[];
  clientesE: Cliente[];
  clientesVol: Cliente[];
  clientesMil: Cliente[];
  clientesTar: Cliente[];
  tareas: Tarea[];
  tareasIni: Tarea[];
  tareasCul: Tarea[];
  tareasBlo: Tarea[];

  constructor(private excelService: ExcelService,
              private clientesServicio: ClienteServicio,
              private tareasServicio: TareaServicio){
  }

  ngOnInit() {
    this.excelService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    );
    this.excelService.getTareas().subscribe(
      tareas => {
        this.tareas = tareas;
      }
    );
    this.tareasServicio.getTareaIni().subscribe(
      tareasIni => {
        this.tareasIni = tareasIni;
      }
    );
    this.tareasServicio.getTareaCul().subscribe(
      tareasCul => {
        this.tareasCul = tareasCul;
      }
    );
    this.tareasServicio.getTareaBlo().subscribe(
      tareasBlo => {
        this.tareasBlo = tareasBlo;
      }
    );
    this.clientesServicio.getResponsablesHombre().subscribe(
      clientesH => {
      this.clientesH = clientesH;
      }
    );
    this.clientesServicio.getResponsablesMujer().subscribe(
      clientesM => {
      this.clientesM = clientesM;
      }
    );
    this.clientesServicio.getResponsablesEmail().subscribe(
      clientesE => {
      this.clientesE = clientesE;
      }
    );
    this.clientesServicio.getVoluntario().subscribe(
      clientesVol => {
      this.clientesVol = clientesVol;
      }
    );
    this.clientesServicio.getrRealizaActividad().subscribe(
      clientesTar => {
      this.clientesTar = clientesTar;
      }
    );
    this.clientesServicio.getMilitante().subscribe(
      clientesMil => {
      this.clientesMil = clientesMil;
      }
    );
    this.calcularPorcentajeH();
    this.calcularPorcentajeM();
  }

  calcularPorcentajeH(){
    return this.clientesH?.length / this.clientes?.length;
  }

  calcularPorcentajeM(){
    return this.clientesM?.length / this.clientes?.length;
  }

  calcularEmail(){
    return this.clientes?.length - this.clientesE?.length;
  }

  calcularPorcentajeE(){
    return this.calcularEmail() / this.clientes?.length;
  }

  calcularPorcentajeVol(){
    return this.clientesVol?.length / this.clientes?.length;
  }
  calcularPorcentajeTar(){
    return this.clientesTar?.length / this.clientes?.length;
  }
  calcularPorcentajeMil(){
    return this.clientesMil?.length / this.clientes?.length;
  }

  calcularPorcentajeIni(){
    return this.tareasIni?.length / this.tareas?.length;
  }
  calcularPorcentajeCul(){
    return this.tareasCul?.length / this.tareas?.length;
  }
  calcularPorcentajeBlo(){
    return this.tareasBlo?.length / this.tareas?.length;
  }

  exportAsXLSX(): void {
      this.excelService.exportAsExcelFile(this.clientes, 'activistas');
  }

  exportAsXLSX1(): void {
    this.excelService.exportAsExcelFile(this.tareas, 'tareas');
  }

}
