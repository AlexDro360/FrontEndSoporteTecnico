import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarBitacoraComponent } from './borrar-bitacora.component';

describe('BorrarBitacoraComponent', () => {
  let component: BorrarBitacoraComponent;
  let fixture: ComponentFixture<BorrarBitacoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrarBitacoraComponent]
    });
    fixture = TestBed.createComponent(BorrarBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
