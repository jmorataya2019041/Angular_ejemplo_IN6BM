import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CiudadesComponent } from './componentes/ciudades/ciudades.component';
import { DetalleEncuestaComponent } from './componentes/detalle-encuesta/detalle-encuesta.component';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path:  'usuarios', component: UsuariosComponent },
  { path: 'encuestas', component:EncuestasComponent },
  { path: 'detalleEncuesta/:idEncuesta', component: DetalleEncuestaComponent },
  { path : 'ciudades', component: CiudadesComponent},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
