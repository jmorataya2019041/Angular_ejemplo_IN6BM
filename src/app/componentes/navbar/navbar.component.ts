import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuariosService]
})
export class NavbarComponent implements OnInit {
  public identity;

  constructor(public _usuarioService: UsuariosService) {
    this.identity = this._usuarioService.getIdentidad();
   }

  ngOnInit(): void {
    console.log(this.identity);
  }

}
