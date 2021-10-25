import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/models/profesor.model';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  public data: any;
  public profesoresData: Array<JSON>;
  public cargando: boolean = true;

  constructor(private router: Router, private _profesorService: ProfesorService) { 
    this.profesoresData = [];
  }

  ngOnInit(): void {
    this.obtenerProfesores();
  }

  crearProfesor(){
    this.router.navigateByUrl('/component/CrearProfesor')
  }

  obtenerProfesores(){

    this.cargando = true;
    this._profesorService.obtenerProfesores().subscribe( resp => {

      this.data = resp;
      this.cargando = false;

      if (this.data.Profesores != {}){
        for (let k in this.data.Profesores){
          this.profesoresData.push(this.data.Profesores[k]);
        }

      }
      else{
        this.profesoresData = [];
      }

    });
  }



  eliminarProfesor(profesor: number){

      Swal.fire({
        title: 'Esta seguro?',
        text: `Esta a punto de borrar un profesor`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {

        if (result.isConfirmed) {
  
          this._profesorService.eliminarProfesor( profesor ).subscribe(
            resp => {
              
              Swal.fire(
                'Excelente',
                `Profesor fue eliminado correctamente`,
                'success'
              );  

              this.profesoresData = [];
              this.obtenerProfesores();
            }
          )
         
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelado',
            'No se elimino el profesor',
            'error'
          )
        }
      })
    }



}
