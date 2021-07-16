import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuracion.guard';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { TareasComponent } from './componentes/tareas/tareas.component';
import { EditarTareasComponent } from './componentes/editar-tareas/editar-tareas.component';
import { ResponsablesComponent } from './componentes/responsables/responsables.component';
import { EditarResponsablesComponent } from './componentes/editar-responsables/editar-responsables.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EditarUsuariosComponent } from './componentes/editar-usuarios/editar-usuarios.component';
import { ConteoComponent } from './componentes/conteo/conteo.component';
import { EditarConteoComponent } from './componentes/editar-conteo/editar-conteo.component';
import { RecintosComponent } from './componentes/recintos/recintos.component';
import { EditarRecintosComponent } from './componentes/editar-recintos/editar-recintos.component';

const routes: Routes = [
  {path: '', component: TableroComponent, canActivate: [AuthGuard]},
  {path: 'tarea', component: TareasComponent, canActivate: [AuthGuard]},
  {path: 'tarea/editar/:id', component: EditarTareasComponent, canActivate: [AuthGuard]},
  {path: 'responsable', component: ResponsablesComponent, canActivate: [AuthGuard]},
  {path: 'responsable/editar/:id', component: EditarResponsablesComponent, canActivate: [AuthGuard]},
  {path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard]},
  {path: 'usuario', component: UsuariosComponent, canActivate: [AuthGuard]},
  {path: 'usuario/editar/:id', component: EditarUsuariosComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent, canActivate: [ConfiguracionGuard]},
  {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  {path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard]},
  {path: 'recinto', component: RecintosComponent, canActivate: [AuthGuard]},
  {path: 'recinto/editar/:id', component: EditarRecintosComponent, canActivate: [AuthGuard]},
  {path: 'conteo', component: ConteoComponent, canActivate: [AuthGuard]},
  {path: 'conteo/editar/:id', component: EditarConteoComponent, canActivate: [AuthGuard]},
  {path: '**', component: NoEncontradoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
