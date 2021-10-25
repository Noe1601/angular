import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleAsignaturaService {

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  obtenerRelacion( _id: number ){
    return this.http.get( `${this.base_url}/relacionAsignaturas/${ _id }`);
  }
}
