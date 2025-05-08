import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBitacoraComponent } from './editar-bitacora.component';

describe('EditarBitacoraComponent', () => {
  let component: EditarBitacoraComponent;
  let fixture: ComponentFixture<EditarBitacoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBitacoraComponent]
    });
    fixture = TestBed.createComponent(EditarBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
