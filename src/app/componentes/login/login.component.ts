import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuariosService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;
  public token;
  public identity;

  constructor(
    private _usuarioService: UsuariosService,
    private _router: Router) {
    this.usuarioModel = new Usuario("", "", "", "", "", "", "");
  }
  ngOnInit(): void {
  }

  //Obtener el token
  getToken() {
    this._usuarioService.login(this.usuarioModel, 'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem("token", this.token);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  //Login
  login() {
    this._usuarioService.login(this.usuarioModel).subscribe(
      response => {
        this.identity = response.usuarioEncontrado;
        localStorage.setItem('identity', JSON.stringify(this.identity))
        this.getToken();
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Login Successfull',
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500
          })
        })()
        this._router.navigate(['/usuarios'])
      },
      error => {
        (async () => {

          const { value: fruit } = await Swal.fire({
            title: 'Email or password incorrect',
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
          })
        })()
      }
    )
  }
}
