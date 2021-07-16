import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';
import { ConteoComponent } from './componentes/conteo/conteo.component';
import { EditarConteoComponent } from './componentes/editar-conteo/editar-conteo.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { TareasComponent } from './componentes/tareas/tareas.component';
import { EditarTareasComponent } from './componentes/editar-tareas/editar-tareas.component';
import { ResponsablesComponent } from './componentes/responsables/responsables.component';
import { EditarResponsablesComponent } from './componentes/editar-responsables/editar-responsables.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EditarUsuariosComponent } from './componentes/editar-usuarios/editar-usuarios.component';
import { RecintosComponent } from './componentes/recintos/recintos.component';
import { EditarRecintosComponent } from './componentes/editar-recintos/editar-recintos.component';
import { AuthGuard } from './guardianes/auth.guard';
import { LoginService } from './servicios/login.service';
import { ClienteServicio } from './servicios/cliente.service';
import { ConfiguracionServicio } from './servicios/configuracion.service';
import { ConteoServicio } from './servicios/conteo.service';
import { ExcelService } from './servicios/sharedServices';
import { TareaServicio } from './servicios/tarea.service';
import { ResponsableServicio } from './servicios/responsables.service';
import { UsuariosServicio } from './servicios/usuarios.service';
import { RecintoServicio } from './servicios/recinto.service';
import { FilterPipe } from './tubo/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    ClientesComponent,
    EditarClienteComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    ConteoComponent,
    EditarConteoComponent,
    ReportesComponent,
    TareasComponent,
    EditarTareasComponent,
    ResponsablesComponent,
    EditarResponsablesComponent,
    UsuariosComponent,
    EditarUsuariosComponent,
    FilterPipe,
    RecintosComponent,
    EditarRecintosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'juntos'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ClienteServicio,
    LoginService,
    AuthGuard,
    ConfiguracionServicio,
    ConfiguracionGuard,
    ConteoServicio,
    TareaServicio,
    ExcelService,
    ResponsableServicio,
    UsuariosServicio,
    RecintoServicio
    // { provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
