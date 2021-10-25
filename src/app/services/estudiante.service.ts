import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Estudiante } from 'src/models/estudiante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  crearEstudiante( estudiante: Estudiante ){
    return this.http.post( `${this.base_url}/estudiante`, estudiante );
  }

  eliminarEstudiante( id: number ){
    return this.http.delete(`${this.base_url}/estudiante/${ id }`);
  }

  obtenerEstudiantePorID( _id: number ){
    return this.http.get(`${ this.base_url }/estudiante/${ _id }`);
  }

  actualizarEstudiante( estudiante: Estudiante ){
    return this.http.put(`${ this.base_url }/estudiante/${ estudiante.id }`, estudiante);
  }
}
