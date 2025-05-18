import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRespuestaComponent } from './actualizar-respuesta.component';

describe('ActualizarRespuestaComponent', () => {
  let component: ActualizarRespuestaComponent;
  let fixture: ComponentFixture<ActualizarRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarRespuestaComponent]
    });
    fixture = TestBed.createComponent(ActualizarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
