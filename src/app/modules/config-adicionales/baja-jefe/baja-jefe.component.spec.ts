import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaJefeComponent } from './baja-jefe.component';

describe('BajaJefeComponent', () => {
  let component: BajaJefeComponent;
  let fixture: ComponentFixture<BajaJefeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BajaJefeComponent]
    });
    fixture = TestBed.createComponent(BajaJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
