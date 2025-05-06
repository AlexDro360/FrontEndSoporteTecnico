import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderSolicitudComponent } from './atender-solicitud.component';

describe('AtenderSolicitudComponent', () => {
  let component: AtenderSolicitudComponent;
  let fixture: ComponentFixture<AtenderSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtenderSolicitudComponent]
    });
    fixture = TestBed.createComponent(AtenderSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
