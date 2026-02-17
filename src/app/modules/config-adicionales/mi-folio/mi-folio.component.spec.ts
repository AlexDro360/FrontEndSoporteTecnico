import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiFolioComponent } from './mi-folio.component';

describe('MiFolioComponent', () => {
  let component: MiFolioComponent;
  let fixture: ComponentFixture<MiFolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiFolioComponent]
    });
    fixture = TestBed.createComponent(MiFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
