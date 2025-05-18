import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigFolioComponent } from './config-folio.component';

describe('ConfigFolioComponent', () => {
  let component: ConfigFolioComponent;
  let fixture: ComponentFixture<ConfigFolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigFolioComponent]
    });
    fixture = TestBed.createComponent(ConfigFolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
