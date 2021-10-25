import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asignatura } from 'src/models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  crearAsignatura( asignatura: Asignatura ){
    return this.http.post( `${this.base_url}/asignatura`, asignatura );
  }

  obtenerAsignaturas(){
    return this.http.get<Asignatura[]>( `${this.base_url}/asignatura`);
  }

  eliminarAsignatura( _id: number){
    return this.http.delete(`${ this.base_url}/asignatura/${ _id }`)
  }

  obtenerAsignaturaPorID( _id: number ){
    return this.http.get(`${ this.base_url }/asignatura/${ _id }`);
  }

  actualizarAsignatura( asignatura: Asignatura ){
    return this.http.put(`${ this.base_url }/asignatura/${ asignatura.id }`, asignatura);
  }

}
