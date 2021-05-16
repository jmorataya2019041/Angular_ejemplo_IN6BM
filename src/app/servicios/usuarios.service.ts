import { Injectable } from '@angular/core';
import { Global } from "./global.service";
import { Usuario } from "../model/usuario.model";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

/*Se crearán las peticiones de las rutas de NodeJS */
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public url: String;
  public identity;
  public token;
  public headers = new HttpHeaders().set('Content-Type'/*Sirve para indicar la cabecera*/, 'application/json'/*Indica que se trabajará una aplicación de Json */)

  constructor(public _htpp: HttpClient /*<---- Sirve para acceder a cada dirección de Node JS*/) {
    this.url = Global.url; /*<--- Se accede a la variable de Global*/
  }

  /*Registrar un usuario */
  registro(usuario: Usuario): Observable<any> {
    let params = JSON.stringify(usuario)

    return this._htpp.post(this.url + '/registrarUsuario', params, { headers/*Dato que espera*/: this.headers/*Variable creada*/ });
    /*`${this.url}+registroUsuario, params, {headers: headers}`*/ /*<--- Otra forma de agregar la url */
  }

  /* Obtener usuarios*/
  obtenerUsuarios(): Observable<any> {
    return this._htpp.get(this.url + '/obtenerUsuarios', { headers: this.headers })
  }

  /*Obtener usuario por id*/
  obtenerUsuarioId(id: String): Observable<any> {
    return this._htpp.get(this.url + '/obtenerUsuarioID/' + id, { headers: this.headers })
  }

  //Crear login
  login(usuario, getToken = null): Observable<any> {
    if (getToken != null) {
      usuario.getToken = getToken;
    }

    let params = JSON.stringify(usuario);

    return this._htpp.post(this.url + '/login', params, { headers: this.headers });
  }

  //Traer la información del usuario
  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identity'));
    if(identidad2 != 'undefined'){
      this.identity = identidad2;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  //Traer la información de token
  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

  //Editar por el rol de Admin
  editarUsuario(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario);
    let headersToken = this.headers.set('Authorization', this.getToken());

    return this._htpp.put(this.url + '/editarAdmin/' + usuario._id, params, {headers: headersToken})
  }

  //Eliminar por el rol de Admin
  eliminarUsuario(id: String): Observable<any>{
    let headersToken = this.headers.set('Authorization',this.getToken());
    return this._htpp.delete(this.url + '/eliminarAdmin/' + id, {headers: headersToken})
  }
}
//Observable (Array de Objetos): Visualizará los datos en un array leyendo y tratando como una lista para ver los datos.
