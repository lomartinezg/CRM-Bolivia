import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../modelo/cliente.model';
import { Tarea } from '../modelo/tarea.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()

export class ExcelService {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;
  tareasColeccion: AngularFirestoreCollection<Tarea>;
  tareaDoc: AngularFirestoreDocument<Tarea>;
  tareas: Observable<Tarea[]>;
  tareanew: Observable<Tarea>;

  constructor(private db: AngularFirestore){
    this.clientesColeccion = db.collection('activista', ref => ref.orderBy('nombre', 'asc'));
    this.tareasColeccion = db.collection('tareas', ref => ref.orderBy('fecha_inicio', 'asc'));

  }

  getClientes(): Observable<Cliente[]>{
    // Obtener los clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
        map( cambios => {
            return cambios.map( accion => {
                const datos = accion.payload.doc.data() as Cliente;
                datos.id = accion.payload.doc.id;
                return datos;
            });
        })
    );
    return this.clientes;
  }

  getTareas(): Observable<Tarea[]>{
    // Obtener las tareas
    this.tareas = this.tareasColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Tarea;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.tareas;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { registros: worksheet }, SheetNames: ['registros'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data, fileName + '_juntos_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

}
