import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRespuestaComponent } from './list-respuesta.component';

describe('ListRespuestaComponent', () => {
  let component: ListRespuestaComponent;
  let fixture: ComponentFixture<ListRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRespuestaComponent]
    });
    fixture = TestBed.createComponent(ListRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
