import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleAsignaturaService } from 'src/app/services/detalle-asignatura.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-asignatura',
  templateUrl: './detalle-asignatura.component.html',
  styleUrls: ['./detalle-asignatura.component.css']
})
export class DetalleAsignaturaComponent implements OnInit {

  public data: any;
  public relacionData: Array<JSON>;
  public cargando: boolean = true;
  public id: any;
  public nombreAsignatura: any;


  constructor(private _activatedRoute: ActivatedRoute, private _detalleAsignaturaService: DetalleAsignaturaService,
              private _estudianteService: EstudianteService) { 
    this.relacionData = [];
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe( ({ id }) => {
      this.obtenerEstudiantesDeAsignatura( id );
      this.id = id
    });
  }



  obtenerEstudiantesDeAsignatura(id: number){

    this.cargando = true;
    this._detalleAsignaturaService.obtenerRelacion(id).subscribe(resp => {

      this.data = resp;
      this.cargando = false;

      
      if (this.data.Asignatura != {}){
        for (let k in this.data.Asignatura){
          this.relacionData.push(this.data.Asignatura[k]);
        }
      }
      else{
        this.relacionData = [];
      }

    });

  }

  async abrirModal(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear estudiante',
      input: 'text',
      inputLabel: 'Nombre del estudiante',
      inputPlaceholder: 'Ingrese el nombre del estudiante',
      showCancelButton: true
    })
   
    const data = {
      nombre: value,
      asignatura: Number(this.id)
    }

    if( value.trim().length > 0 ){
      this._estudianteService.crearEstudiante(data).subscribe( resp => {
        this.relacionData = [];
        this.obtenerEstudiantesDeAsignatura(data.asignatura);

        Swal.fire(
          'Excelente',
          `Estudiante registrado exitosamente`,
          'success'
        );  

      })
    }else{

        Swal.fire(
          'Lo sentimos!',
          `No se pudo completar el proceso de registro, intentelo de nuevo.`,
          'error'
        );  

    }

  }



  eliminarEstudiante(estudiante: number){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar un estudiante`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this._estudianteService.eliminarEstudiante( estudiante ).subscribe(
          resp => {
            
            Swal.fire(
              'Excelente',
              `Estudiante fue eliminado correctamente`,
              'success'
            );  

            this.relacionData = [];
            this.obtenerEstudiantesDeAsignatura(this.id);
          }
        )
       
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se elimino el estudiante',
          'error'
        )
      }
    })
  }

}
