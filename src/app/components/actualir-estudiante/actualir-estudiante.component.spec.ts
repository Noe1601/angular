import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualirEstudianteComponent } from './actualir-estudiante.component';

describe('ActualirEstudianteComponent', () => {
  let component: ActualirEstudianteComponent;
  let fixture: ComponentFixture<ActualirEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualirEstudianteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualirEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
