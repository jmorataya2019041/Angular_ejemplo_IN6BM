import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario.model';
import { UsuariosService } from "../../servicios/usuarios.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuariosService]
})
export class RegistroComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    private _usuarioService: UsuariosService,
    private _router: Router) {
    this.usuario = new Usuario("","","","","","","");
  }

  ngOnInit(): void {
  }

  //Función para registrar usuarios
  registrar(){
    this._usuarioService.registro(this.usuario).subscribe(
      response=>{
        console.log(response);
        this._router.navigate(["/usuarios"])
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
