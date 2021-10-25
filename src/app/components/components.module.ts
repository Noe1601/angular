import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutes } from './component.routing';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { CrearAsignaturaComponent } from './crear-asignatura/crear-asignatura.component';
import { ActualizarProfesorComponent } from './actualizar-profesor/actualizar-profesor.component';
import { ActualizarAsignaturaComponent } from './actualizar-asignatura/actualizar-asignatura.component';
import { ActualirEstudianteComponent } from './actualir-estudiante/actualir-estudiante.component';



@NgModule({
  declarations: [
    CrearProfesorComponent,
    CrearAsignaturaComponent,
    ActualizarProfesorComponent,
    ActualizarAsignaturaComponent,
    ActualirEstudianteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
