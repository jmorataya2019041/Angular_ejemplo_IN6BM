import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import Swal from 'sweetalert2';
import { UsuariosService } from "../../servicios/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuariosService]
})
export class UsuariosComponent implements OnInit {
  public usuarios;
  public idUsuarioModel: Usuario;
  constructor(private _usuarioService: UsuariosService) {
    this.idUsuarioModel = new Usuario("", "", "", "", "", "", "")
  }

  filterPost = '';

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        this.usuarios = response.Usuarios;
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  //Obtener usuario ID: un único usuario
  obtenerUsuarioId(idUsuario) {
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response => {
        this.idUsuarioModel = response.Usuario;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  //Editar el usuario
  editarUsuario() {
    this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
      response => {
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Usuario Editado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
        this.obtenerUsuarios();
      },
      error => {
        console.log(error);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Error al editar',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }

  //Eliminar Usuario
  eliminarUsuario(idUsuario) {
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response => {
        console.log(response);
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Usuario Eliminado',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
        this.obtenerUsuarios();
      },
      error => {
        console.log(error);
        (async () => {
          const { value: fruit } = await Swal.fire({
            title: 'Error al Eliminar',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000
          })
        })()
      }
    )
  }
}
