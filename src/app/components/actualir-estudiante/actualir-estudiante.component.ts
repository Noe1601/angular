import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { Estudiante } from 'src/models/estudiante.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualir-estudiante',
  templateUrl: './actualir-estudiante.component.html',
  styleUrls: ['./actualir-estudiante.component.css']
})
export class ActualirEstudianteComponent implements OnInit {
  
  public data: any;
  public profesoresData: Array<JSON>;
  public cargando: boolean = true;
  public id: any;
  
  public estudianteForm: FormGroup | undefined;
  
  constructor(private fb: FormBuilder,
    private router: Router, private activated: ActivatedRoute,private _estudianteService: EstudianteService) {
    this.profesoresData = [];
   }

  ngOnInit(): void {

    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required]
    });

    this.activated.params.subscribe( ({ id }) => {
      this.id = id;
      this.cargarEstudiante(id);
    });

  }

  cargarEstudiante(id: number){

    this._estudianteService.obtenerEstudiantePorID(id).subscribe( resp => {

      this.data = resp;
      const { NOMBRE } = this.data.Estudiante;
      this.estudianteForm?.setValue({ nombre: NOMBRE });

    });

  }

  actualizarEstudiante(){

 const data: Estudiante = {
      ...this.estudianteForm?.value,
      id: Number(this.id)
    }

    this._estudianteService.actualizarEstudiante(data).subscribe( resp => {

      Swal.fire(
        'Excelente',
        `Estudiante actualizado correctamente`,
        'success'
      );  
      
    })
  }

}


