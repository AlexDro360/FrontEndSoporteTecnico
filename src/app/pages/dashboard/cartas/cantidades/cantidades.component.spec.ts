import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantidadesComponent } from './cantidades.component';

describe('CantidadesComponent', () => {
  let component: CantidadesComponent;
  let fixture: ComponentFixture<CantidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CantidadesComponent]
    });
    fixture = TestBed.createComponent(CantidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
