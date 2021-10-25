import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(public _usuariosService: UsuariosService, private router: Router) {}

  logout(){
    this._usuariosService.destruirLocalStorage();
    this.router.navigateByUrl('/login')
  }
}
