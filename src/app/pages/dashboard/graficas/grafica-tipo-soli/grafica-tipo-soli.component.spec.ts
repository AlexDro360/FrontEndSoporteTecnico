import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTipoSoliComponent } from './grafica-tipo-soli.component';

describe('GraficaTipoSoliComponent', () => {
  let component: GraficaTipoSoliComponent;
  let fixture: ComponentFixture<GraficaTipoSoliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaTipoSoliComponent]
    });
    fixture = TestBed.createComponent(GraficaTipoSoliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
