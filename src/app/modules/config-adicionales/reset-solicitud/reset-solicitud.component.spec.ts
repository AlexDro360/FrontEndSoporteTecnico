import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSolicitudComponent } from './reset-solicitud.component';

describe('ResetSolicitudComponent', () => {
  let component: ResetSolicitudComponent;
  let fixture: ComponentFixture<ResetSolicitudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetSolicitudComponent]
    });
    fixture = TestBed.createComponent(ResetSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
