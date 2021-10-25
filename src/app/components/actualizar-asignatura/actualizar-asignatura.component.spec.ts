import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsignaturaComponent } from './actualizar-asignatura.component';

describe('ActualizarAsignaturaComponent', () => {
  let component: ActualizarAsignaturaComponent;
  let fixture: ComponentFixture<ActualizarAsignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarAsignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAsignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
