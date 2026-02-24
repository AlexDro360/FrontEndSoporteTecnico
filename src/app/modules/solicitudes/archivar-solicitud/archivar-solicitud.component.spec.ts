import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivarSolicitudComponent } from './archivar-solicitud.component';

describe('ArchivarSolicitudComponent', () => {
  let component: ArchivarSolicitudComponent;
  let fixture: ComponentFixture<ArchivarSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivarSolicitudComponent]
    });
    fixture = TestBed.createComponent(ArchivarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
