import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneacionListComponent } from './planeacion-list.component';

describe('PlaneacionListComponent', () => {
  let component: PlaneacionListComponent;
  let fixture: ComponentFixture<PlaneacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaneacionListComponent]
    });
    fixture = TestBed.createComponent(PlaneacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
