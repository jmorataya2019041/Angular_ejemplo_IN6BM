import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EncuestasComponent } from './componentes/encuestas/encuestas.component';
import { DetalleEncuestaComponent } from './componentes/detalle-encuesta/detalle-encuesta.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { CiudadesComponent } from './componentes/ciudades/ciudades.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    UsuariosComponent,
    EncuestasComponent,
    DetalleEncuestaComponent,
    FilterPipe,
    CiudadesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfiguration)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
