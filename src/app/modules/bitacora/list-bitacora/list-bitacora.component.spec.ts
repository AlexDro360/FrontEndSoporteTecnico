import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBitacoraComponent } from './list-bitacora.component';

describe('ListBitacoraComponent', () => {
  let component: ListBitacoraComponent;
  let fixture: ComponentFixture<ListBitacoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBitacoraComponent]
    });
    fixture = TestBed.createComponent(ListBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
