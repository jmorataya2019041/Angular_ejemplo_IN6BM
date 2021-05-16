import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encuesta } from 'src/app/model/encuestas.model';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-detalle-encuesta',
  templateUrl: './detalle-encuesta.component.html',
  styleUrls: ['./detalle-encuesta.component.scss'],
  providers: [UsuariosService, EncuestaService]
})
export class DetalleEncuestaComponent implements OnInit {
  public encuestaModel;
  public token;
  public idEncuestaRuta: string;


  constructor(
    public _usuariosService: UsuariosService,
    public _encuestaService: EncuestaService,
    public _activatedRoute: ActivatedRoute,
  ) {
    this.token = this._usuariosService.getToken();
    this.encuestaModel = new Encuesta(
      '',
      '',
      '',
      { si: 0, no: 0, ninguno: 0, usuariosEncuestados: [] },
      [{ textoComentario: '', idUsuarioComentario: '' }],
      ''
    );
  }

  ngOnInit(): void {
    //Obtener el id
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.idEncuestaRuta = dataRuta.get('idEncuesta');
    });
    this.obtenerEncuestaId(this.idEncuestaRuta)
  }

  //Otra manera de Navegar con parámetros
  obtenerEncuestaId(idEncuesta) {
    this._encuestaService.obtenerEncuestaId(this.token, idEncuesta).subscribe(
      response => {
        this.encuestaModel = response.encuestaSee;
        console.log(response)
      }
    )
  }

}
