import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Asignatura } from 'src/models/asignatura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-asignatura',
  templateUrl: './actualizar-asignatura.component.html',
  styleUrls: ['./actualizar-asignatura.component.css']
})
export class ActualizarAsignaturaComponent implements OnInit {

  public data: any;
  public profesoresData: Array<JSON>;
  public cargando: boolean = true;
  public id: any;
  
  public asignaturaForm: FormGroup | undefined;
  
  constructor(private fb: FormBuilder,
    private router: Router, private activated: ActivatedRoute,private _asignaturaService: AsignaturaService,
            private _profesorService: ProfesorService) {
    this.profesoresData = [];
   }

  ngOnInit(): void {
    
    this.asignaturaForm = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required]
    });

    this.obtenerProfesores();

    this.activated.params.subscribe( ({ id }) => {
      this.id = id;
      this.cargarAsignatura(id);
    });

  }


  obtenerProfesores(){

    this._profesorService.obtenerProfesores().subscribe( resp => {

      this.data = resp;

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


  cargarAsignatura(id: number){
    this._asignaturaService.obtenerAsignaturaPorID(id).subscribe( resp => {

      this.data = resp;
      const { NOMBRE, ID, PROFESOR } = this.data.Asignatura;
      this.asignaturaForm?.setValue({nombre: NOMBRE, profesor: PROFESOR});

    });
  }

  actualizarAsignatura(){

  const data: Asignatura = {
      ...this.asignaturaForm?.value,
      id: Number(this.id)
    }

    this._asignaturaService.actualizarAsignatura(data).subscribe( resp => {

      Swal.fire(
        'Excelente',
        `Asignatura actualizada correctamente`,
        'success'
      );  

      this.router.navigateByUrl('/component/Asignaturas');
      
    })
  }

}
