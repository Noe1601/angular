import { Routes } from '@angular/router';
import { ActualirEstudianteComponent } from './actualir-estudiante/actualir-estudiante.component';
import { ActualizarAsignaturaComponent } from './actualizar-asignatura/actualizar-asignatura.component';
import { ActualizarProfesorComponent } from './actualizar-profesor/actualizar-profesor.component';
import { AsignaturasComponent } from './asignaturas/asignaturas.component';
import { CrearAsignaturaComponent } from './crear-asignatura/crear-asignatura.component';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import { DetalleAsignaturaComponent } from './detalle-asignatura/detalle-asignatura.component';
import { ProfesoresComponent } from './profesores/profesores.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'profesores',
				component: ProfesoresComponent,
				data: {
					title: 'Profesores',
				}
			},
			{
				path: 'Asignaturas',
				component: AsignaturasComponent,
				data: {
					title: 'Asignaturas',
				}
			},
			{
				path: 'CrearProfesor',
				component: CrearProfesorComponent,
				data: {
					title: 'Crear profesor',
				}
			},
			{
				path: 'CrearEstudiante',
				component: CrearAsignaturaComponent,
				data: {
					title: 'Crear estudiantes',
				}
			},
			{
				path: 'CrearAsignatura',
				component: CrearAsignaturaComponent,
				data: {
					title: 'Crear asignaturas',
				}
			},
			{
				path: 'detalleAsignatura/:id',
				component: DetalleAsignaturaComponent,
				data: {
					title: 'Detalle asignatura',
				}
			},
			{
				path: 'atualizaProfesor/:id',
				component: ActualizarProfesorComponent,
				data: {
					title: 'Actualizar profesor',
				}
			},
			{
				path: 'actualizaAsignatura/:id',
				component: ActualizarAsignaturaComponent,
				data: {
					title: 'Actualizar asignatura',
				}
			},
			{
				path: 'actualizarEstudiante/:id',
				component: ActualirEstudianteComponent,
				data: {
					title: 'Actualizar estudiante',
				}
			},
		]
	}
];
