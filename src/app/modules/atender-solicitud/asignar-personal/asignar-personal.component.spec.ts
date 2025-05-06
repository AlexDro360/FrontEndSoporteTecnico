import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPersonalComponent } from './asignar-personal.component';

describe('AsignarPersonalComponent', () => {
  let component: AsignarPersonalComponent;
  let fixture: ComponentFixture<AsignarPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarPersonalComponent]
    });
    fixture = TestBed.createComponent(AsignarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
