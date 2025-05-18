import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAdicionalesComponent } from './config-adicionales.component';

describe('ConfigAdicionalesComponent', () => {
  let component: ConfigAdicionalesComponent;
  let fixture: ComponentFixture<ConfigAdicionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAdicionalesComponent]
    });
    fixture = TestBed.createComponent(ConfigAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
