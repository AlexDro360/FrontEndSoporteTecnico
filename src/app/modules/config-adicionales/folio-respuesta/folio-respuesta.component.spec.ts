import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioRespuestaComponent } from './folio-respuesta.component';

describe('FolioRespuestaComponent', () => {
  let component: FolioRespuestaComponent;
  let fixture: ComponentFixture<FolioRespuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolioRespuestaComponent]
    });
    fixture = TestBed.createComponent(FolioRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
