import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRespuestaComponent } from './ver-respuesta.component';

describe('VerRespuestaComponent', () => {
  let component: VerRespuestaComponent;
  let fixture: ComponentFixture<VerRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerRespuestaComponent]
    });
    fixture = TestBed.createComponent(VerRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
