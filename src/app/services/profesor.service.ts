import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  obtenerProfesores(){
    return this.http.get<Profesor[]>(`${this.base_url}/profesores`);
  }

  crearProfesor( profesor: Profesor ){
    return this.http.post( `${this.base_url}/profesores`, profesor );
  }

  eliminarProfesor( _id: number ){
    return this.http.delete(`${ this.base_url}/profesores/${ _id }`)
  }

  obtenerProfesorPorID( _id: number ){
    return this.http.get(`${ this.base_url }/profesores/${ _id }`);
  }

  actualizarProfesor( profesor: Profesor ){
    return this.http.put(`${ this.base_url }/profesores/${ profesor.id }`, profesor);
  }

}
