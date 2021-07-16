import { Component, OnInit, Input } from '@angular/core';
import { ConteoServicio } from 'src/app/servicios/conteo.service';
import { Conteo } from 'src/app/modelo/conteo.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-editar-conteo',
  templateUrl: './editar-conteo.component.html',
  styleUrls: ['./editar-conteo.component.css']
})

export class EditarConteoComponent implements OnInit {

  conteo: Conteo = {
    provincia: '',
    municipio: '',
    asiento: '',
    recinto: '',
    mesa: '',
    electores: '',
    votos_canidatoa: '',
    votos_canidatob: '',
    votos_nulos: '',
    usuario: '',
    fecha_act: '',
    contado: ''
  };

  @Input() loggeado: string;
  @Input() userLogueado: string;

  id: string;
  fecheActual: string = new Date().toLocaleDateString();
  totalizado: string = 'SI';

  constructor(private conteosServicio: ConteoServicio,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute,
              private loginService: LoginService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.conteosServicio.getConteo(this.id).subscribe( conteo => {
      this.conteo = conteo;
    });
    this.getLoggedUser();
    // const sum = (this.conteo.votos_canidatoa + this.conteo.votos_canidatob + this.conteo.votos_nulos);
  }

  getLoggedUser(){
    // Recuperando usuario logueado
    this.loginService.getAuth().subscribe(auth => {
      this.userLogueado = auth.email;
        // console.log('Usuario: ' + `'${this.usuario}'`);
    });
  }

  guardar({value, valid}: {value: Conteo, valid: boolean}){

    let resultado: string;
    resultado = (this.conteo.votos_canidatoa + this.conteo.votos_canidatob + this.conteo.votos_nulos);

    if (!valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      value.id = this.id;
      // console.log('Variable: ' + resultado);
      // console.log('Electores: ' + this.conteo.electores);
      // Declarar totalzacion por mesa MODIFICA CONTEO
      if (resultado <= this.conteo.electores){
        this.conteosServicio.modificarConteo(value);
        this.router.navigate(['/conteo']);
      }
      else{
        this.flashMessages.show('El total de votos declarados NO debe superar a los electores inscritos!', {
          cssClass: 'alert-danger', timeout: 4000
        });
      }
    }
  }

  eliminar(){
    if (confirm('¿Seguro que desea elminiar el centro?')){
      this.conteosServicio.eliminarConteo(this.conteo);
      this.router.navigate(['/conteo']);
    }
  }

}
