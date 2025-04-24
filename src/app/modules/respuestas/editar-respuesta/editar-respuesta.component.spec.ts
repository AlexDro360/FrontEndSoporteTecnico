import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRespuestaComponent } from './editar-respuesta.component';

describe('EditarRespuestaComponent', () => {
  let component: EditarRespuestaComponent;
  let fixture: ComponentFixture<EditarRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarRespuestaComponent]
    });
    fixture = TestBed.createComponent(EditarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
