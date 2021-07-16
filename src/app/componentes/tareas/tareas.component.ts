import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TareaServicio } from 'src/app/servicios/tarea.service';
import { Tarea } from 'src/app/modelo/tarea.model';
import { ResponsableServicio } from 'src/app/servicios/responsables.service';
import { Responsable } from 'src/app/modelo/responsables.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {

  tareas: Tarea[];
  tareanew: Tarea = {
    tarea: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    responsable: '',
    estado: '',
    comentario: '',
    usuario: ''
  };

  email = '';
  seleccion;

  responsables: Responsable[];
  listaresponsables: Responsable[];
  responsable: Responsable = {
    nombre: '',
    apellido: '',
    email: ''
  };

   fecheActual: string = new Date().toLocaleDateString();
   userAdmin: boolean;

  @ViewChild('tareaForm') tareaForm: NgForm;
  @ViewChild('botonCerrar') botonCerrar: ElementRef;
  @Input() loggeado: string;
  @Input() userLogueado: string;

  lista = [];



  constructor(private tareasServicio: TareaServicio,
              private responsablesServicio: ResponsableServicio,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService) {
  }

  async ngOnInit() {

    let userAdmin = localStorage.getItem('existe');
    // console.log('Existe = ' + userAdmin);
    // tslint:disable-next-line: triple-equals
    if (localStorage.getItem('existe') == 'true') {
      this.userAdmin = true;
      // console.log('Existe = ' + userAdmin);
    }

    this.loginService.getAuth().subscribe(auth => {
      this.loggeado = auth.email;
      this.tareasServicio.getTareas(auth.email).subscribe(
          tareas => {
          this.tareas = tareas;
          }
        );
      });
    this.getLoggedUser();
    this.responsablesServicio.getResponsablesAct().subscribe( responsable => {
      this.responsables = responsable;
       this.listaresponsables = responsable;
    });
  }

  getLoggedUser(){
    // Recuperando usuario logueado
    this.loginService.getAuth().subscribe(auth => {
        this.userLogueado = auth.email;
        // console.log('Usuario: ' + `'${this.usuario}'`);
    });
  }

  agregar({value, valid}: {value: Tarea, valid: boolean}){

    // value.responsable = this.seleccion.nombre + ' ' + this.seleccion.apellido;
    // value.usuario = this.seleccion.email;

    if (!valid){
    this.flashMessages.show('Por favor llena el formulario correctamente', {
    cssClass: 'alert-danger', timeout: 4000
    });
    }
    else{
      // console.log(this.lista)
      for (var i=0;i<this.lista.length;i++){
        value.email = this.lista[i].email;
        value.responsable = this.lista[i].nombre + ' ' + this.lista[i].apellido;
        value.usuario = this.lista[i].email;
        this.tareasServicio.agregarTarea(value);
      }

      this.tareaForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  // Cuando un select cambia
  onOptionsSelected(id){
    this.email = this.getUserById(id).email;
    // console.log('seleccion: ' + this.email);
    //  console.log('seleccion: ' + this.getUserById(id).email);
    // console.log(this.tareanew.responsable);
  }

  getUserById(id){
    this.listaresponsables.forEach(element => {
    // tslint:disable-next-line: triple-equals
    if (element.id == id){
        this.seleccion = element;
      }
    });
    return this.seleccion;
  }

  seleccionItem(item){
    this.lista.push(item);
  }

}
