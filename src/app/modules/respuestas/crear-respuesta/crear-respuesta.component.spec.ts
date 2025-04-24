import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRespuestaComponent } from './crear-respuesta.component';

describe('CrearRespuestaComponent', () => {
  let component: CrearRespuestaComponent;
  let fixture: ComponentFixture<CrearRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearRespuestaComponent]
    });
    fixture = TestBed.createComponent(CrearRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
