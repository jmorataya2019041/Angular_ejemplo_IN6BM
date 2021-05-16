import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Global } from './global.service'
import { Observable } from 'rxjs'
import { Encuesta } from '../model/encuestas.model'

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  //Función para obtener las encuestas
  obtenerEncuestas(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url + '/obtenerEncuestas', {headers: headersToken})
  }

  //Funcion para agregar encuestas
  agregarEncuestas(encuesta: Encuesta, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(encuesta);
    return this._http.post(this.url + '/crearEncuesta', params, {headers: headersToken})
  }

  //Función para obtener la encuesta por id
  obtenerEncuestaId(token, id: String): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)

    return this._http.get(this.url + '/obtenerEncuestaId/'+ id, {headers: headersToken})
  }

  //Función para agregar comentario
  agregarComentario(token, modeloComentario): Observable<any>{
    let headersToken = this.headers.set('Authorization', token);
    let params = JSON.stringify(modeloComentario);

    return this._http.put(this.url + '/agregarComentario/'+ modeloComentario.idEncuesta, params,{headers: headersToken})
  }
}
