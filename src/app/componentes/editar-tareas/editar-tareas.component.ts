import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TareaServicio } from 'src/app/servicios/tarea.service';
import { Tarea } from 'src/app/modelo/tarea.model';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-editar-tareas',
  templateUrl: './editar-tareas.component.html',
  styleUrls: ['./editar-tareas.component.css']
})
export class EditarTareasComponent implements OnInit {

  tareanew: Tarea = {
    tarea: '',
    fecha_inicio: '',
    fecha_fin: '',
    descripcion: '',
    responsable: '',
    estado: '',
    comentario: ''
  };

  id: string;

  constructor(private tareasServicio: TareaServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.tareasServicio.getTarea(this.id).subscribe( tareanew => {
      this.tareanew = tareanew;
    });
  }

  guardar({value, valid}: {value: Tarea, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // modicar el centro
      this.tareasServicio.modificarTarea(value);
      this.router.navigate(['/tarea']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar la tarea?')){
      this.tareasServicio.eliminarTarea(this.tareanew);
      this.router.navigate(['/tarea']);
    }
  }

}
