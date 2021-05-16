import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Encuesta } from 'src/app/model/encuestas.model';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  providers: [EncuestaService, UsuariosService]
})
export class EncuestasComponent implements OnInit {
  public token;
  public encuestasModelGet: Encuesta;
  public encuestaModelAdd: Encuesta;
  public encuestaModelGetId: Encuesta;
  public modeloComentario = {
    idEncuesta: '',
    textoComentario: ''
  }

  constructor(
    private _encuestaService: EncuestaService,
    private _usuarioService: UsuariosService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.encuestaModelAdd = new Encuesta(
      '',
      '',
      '',
      { si: 0, no: 0, ninguno: 0, usuariosEncuestados: [] },
      [{ textoComentario: '', idUsuarioComentario: '' }],
      ''
    );
  }

  ngOnInit(): void {
    this.obtenerEncuestas();
  }

  //Función para obtener las encuestas
  obtenerEncuestas() {
    this._encuestaService.obtenerEncuestas(this.token).subscribe(
      (response) => {
        this.encuestasModelGet = response.encuestasEncontradas;
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Función para obtener una encuesta
  obtenerEncuesta(idEncuesta){
    this._encuestaService.obtenerEncuestaId(this.token, idEncuesta).subscribe(
      response => {
        this.encuestaModelGetId = response.encuestaSee;
        console.log(response);
      }
    )
  }

  //Función para agregar encuesta
  agregarEncuesta() {
    this._encuestaService.agregarEncuestas(this.encuestaModelAdd, this.token).subscribe(
      response =>{
        console.log(response);
        this.encuestaModelAdd.titulo = '';
        this.encuestaModelAdd.descripcion = '';
        this.obtenerEncuestas();
      },
      error =>{
        console.log(error);

      }
    )
  }

  //Función para agregar comentario
  agregarComentario(){
    this.modeloComentario.idEncuesta = String(this.encuestaModelGetId._id);
    this._encuestaService.agregarComentario(this.token, this.modeloComentario).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  //Navegar a detalle encuesta
  navegarDetalleEncuesta(idEncuesta){
    this._router.navigate(['/detalleEncuesta',idEncuesta])
  }
}
