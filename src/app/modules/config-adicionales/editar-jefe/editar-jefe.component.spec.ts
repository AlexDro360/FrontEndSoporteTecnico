import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJefeComponent } from './editar-jefe.component';

describe('EditarJefeComponent', () => {
  let component: EditarJefeComponent;
  let fixture: ComponentFixture<EditarJefeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarJefeComponent]
    });
    fixture = TestBed.createComponent(EditarJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
