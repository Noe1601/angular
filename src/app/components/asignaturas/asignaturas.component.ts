import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.component.html',
  styleUrls: ['./asignaturas.component.css']
})
export class AsignaturasComponent implements OnInit {

  public data: any;
  public asignaturasData: Array<JSON>;
  public cargando: boolean = true;

  constructor(private router: Router, private _asignaturaService: AsignaturaService,
    private permissionsService: NgxPermissionsService) { 
    this.asignaturasData = [];
  }

  ngOnInit(): void {

    this.obtenerAsignaturas();
    const rol = localStorage.getItem('Rol');
    this.permissionsService.loadPermissions([`${ rol }`]);
  }

  crearAsignatura(){
    this.router.navigateByUrl('/component/CrearAsignatura')
  }

  obtenerAsignaturas(){
    
    this.cargando = true;
    this._asignaturaService.obtenerAsignaturas().subscribe( resp => {

      this.data = resp;
      this.cargando = false;

      if (this.data.Asignatura != {}){
        for (let k in this.data.Asignatura){
          this.asignaturasData.push(this.data.Asignatura[k]);
        }

      }
      else{
        this.asignaturasData = [];
      }

    });
  }


  eliminarAsignaturas(id: number){

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar una asignatura`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {

      if (result.isConfirmed) {

        this._asignaturaService.eliminarAsignatura(id).subscribe(resp => {

          Swal.fire(
            'Excelente',
            `Asignatura fue eliminada correctamente`,
            'success'
          );  

          this.asignaturasData = [];
          this.obtenerAsignaturas();
        });

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'No se elimino la asignatura',
          'error'
        )
      }
    })

  }

}
