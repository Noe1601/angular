import { _ParseAST } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.css']
})
export class CrearProfesorComponent implements OnInit {

  public profesorForm: FormGroup | undefined;

  constructor(private fb: FormBuilder,
   private router: Router, private activated: ActivatedRoute, private _profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required]
    })
  }


  limpiarFormulario(){
    this.profesorForm?.reset();
  }

  crearProfesor(){

    const { nombre } = this.profesorForm?.value;

    this._profesorService.crearProfesor(this.profesorForm?.value).subscribe( resp => {
      this.limpiarFormulario();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${ nombre } fue registrado exitosamente!`,
        showConfirmButton: false,
        timer: 2000
      });

      this.router.navigateByUrl('/component/profesores')

    })
  }

}
