import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefesDepartamentoComponent } from './jefes-departamento.component';

describe('JefesDepartamentoComponent', () => {
  let component: JefesDepartamentoComponent;
  let fixture: ComponentFixture<JefesDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JefesDepartamentoComponent]
    });
    fixture = TestBed.createComponent(JefesDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
