import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.component.html',
  styleUrls: ['./crear-asignatura.component.css']
})
export class CrearAsignaturaComponent implements OnInit {

  public data: any;
  public profesoresData: Array<JSON>;
  public cargando: boolean = true;
  
  public asignaturaForm: FormGroup | undefined;

  
  constructor(private fb: FormBuilder,
   private router: Router, private activated: ActivatedRoute, private _profesorService: ProfesorService,
    private _asignaturaService: AsignaturaService) {
     this.profesoresData = [];
    }

  ngOnInit(): void {

    this.asignaturaForm = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required]
    });

    this.obtenerProfesores();
  }

  limpiarFormulario(){
    this.asignaturaForm?.reset();
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


  crearAsignatura(){
    const { nombre } = this.asignaturaForm?.value;

    this._asignaturaService.crearAsignatura(this.asignaturaForm?.value).subscribe( resp => {
      this.limpiarFormulario();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${ nombre } fue registrado exitosamente!`,
        showConfirmButton: false,
        timer: 2000
      });

      this.router.navigateByUrl('/component/Asignaturas')

    })
  }

}
