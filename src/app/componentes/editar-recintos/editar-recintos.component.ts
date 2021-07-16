import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { Recinto } from 'src/app/modelo/recinto.model';
import { RecintoServicio } from 'src/app/servicios/recinto.service';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-editar-recintos',
  templateUrl: './editar-recintos.component.html',
  styleUrls: ['./editar-recintos.component.css']
})
export class EditarRecintosComponent implements OnInit {

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
    abierto: '',
    comentarios: '',
    usuario: '',
    creacion: ''
  };

  @Input() loggeado: string;
  @Input() userLogueado: string;

  id: string;
  fecheActual: string = new Date().toLocaleDateString();

  constructor(private recintosServicio: RecintoServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService
) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recintosServicio.getRecinto(this.id).subscribe( recinto => {
      this.recintoT = recinto;
      // console.log(this.recintoT);
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

  guardar({value, valid}: {value: Recinto, valid: boolean}){
    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // console.log(this.id);
      // actualiza recinto
      this.recintosServicio.modificarRecinto(value);
      this.router.navigate(['/recinto']);
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar el recinto?')){
      this.recintosServicio.eliminarRecinto(this.recintoT);
      this.router.navigate(['/recinto']);
    }
  }

}
