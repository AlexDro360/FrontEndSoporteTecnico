import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaJefeComponent } from './alta-jefe.component';

describe('AltaJefeComponent', () => {
  let component: AltaJefeComponent;
  let fixture: ComponentFixture<AltaJefeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltaJefeComponent]
    });
    fixture = TestBed.createComponent(AltaJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
