import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  registrarUsuario( usuario: Usuario ){
    return this.http.post(`${ this.base_url}/usuarios`, usuario);
  }

  login( usuario: Usuario ){
    return this.http.post(`${ this.base_url}/login`, usuario);
  }

  guardarEnLocalStorage(usuario: string, rol: string){
    localStorage.setItem('Usuario', usuario);
    localStorage.setItem('Rol', rol);
  }

  validarLocalStorage(): boolean{
    const usuario = localStorage.getItem('Usuario');
    if(usuario){
      return true;
    }else{
      return false;
    }
  }

  destruirLocalStorage(){
    localStorage.removeItem('Usuario');
    localStorage.removeItem('Rol');
  }

}
