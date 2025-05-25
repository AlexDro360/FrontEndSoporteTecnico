import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaFrecuenciaComponent } from './grafica-frecuencia.component';

describe('GraficaFrecuenciaComponent', () => {
  let component: GraficaFrecuenciaComponent;
  let fixture: ComponentFixture<GraficaFrecuenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaFrecuenciaComponent]
    });
    fixture = TestBed.createComponent(GraficaFrecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
