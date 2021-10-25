import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private _usuarioService: UsuariosService, private router: Router){}

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    
      if(this._usuarioService.validarLocalStorage()){
        return true;
      }else{
        this.router.navigateByUrl('/login')
        return false;
      }

  }
  
}
