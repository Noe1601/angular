import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from 'src/models/profesor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-profesor',
  templateUrl: './actualizar-profesor.component.html',
  styleUrls: ['./actualizar-profesor.component.css']
})
export class ActualizarProfesorComponent implements OnInit {

  public profesorForm: FormGroup | undefined;
  public id: any;
  public data: any;
  public profesorData: Array<JSON>;
  
  constructor(private fb: FormBuilder,
    private router: Router, private activated: ActivatedRoute, private _profesorService: ProfesorService) 
    {
      this.profesorData = [];
     }

  ngOnInit(): void {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required]
    })

    this.activated.params.subscribe( ({ id }) => {
      this.id = id;
      this.cargarProfesor(id);
    })

  }

  cargarProfesor(id: number){
    this._profesorService.obtenerProfesorPorID(id).subscribe( resp => {

      this.data = resp;
      const { NOMBRE, EDAD, ID } = this.data.Profesor;
      this.profesorForm?.setValue({nombre: NOMBRE, edad: EDAD});

    });
  }

  actualizarProfesor(){

    const data: Profesor = {
      ...this.profesorForm?.value,
      id: Number(this.id)
    }

    this._profesorService.actualizarProfesor(data).subscribe( resp => {

      Swal.fire(
        'Excelente',
        `Profesor fue actualizado correctamente`,
        'success'
      );  

      this.router.navigateByUrl('/component/profesores');
      
    })
  }

}
