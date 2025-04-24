import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRespuestaComponent } from './borrar-respuesta.component';

describe('BorrarRespuestaComponent', () => {
  let component: BorrarRespuestaComponent;
  let fixture: ComponentFixture<BorrarRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarRespuestaComponent]
    });
    fixture = TestBed.createComponent(BorrarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
