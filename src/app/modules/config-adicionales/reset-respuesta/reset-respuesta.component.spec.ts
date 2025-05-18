import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetRespuestaComponent } from './reset-respuesta.component';

describe('ResetRespuestaComponent', () => {
  let component: ResetRespuestaComponent;
  let fixture: ComponentFixture<ResetRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetRespuestaComponent]
    });
    fixture = TestBed.createComponent(ResetRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
