import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarJefeComponent } from './agregar-jefe.component';

describe('AgregarJefeComponent', () => {
  let component: AgregarJefeComponent;
  let fixture: ComponentFixture<AgregarJefeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarJefeComponent]
    });
    fixture = TestBed.createComponent(AgregarJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
