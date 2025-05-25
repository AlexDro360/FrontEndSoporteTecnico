import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaFechasComponent } from './grafica-fechas.component';

describe('GraficaFechasComponent', () => {
  let component: GraficaFechasComponent;
  let fixture: ComponentFixture<GraficaFechasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaFechasComponent]
    });
    fixture = TestBed.createComponent(GraficaFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
