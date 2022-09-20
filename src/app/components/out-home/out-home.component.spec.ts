import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutHomeComponent } from './out-home.component';

describe('OutHomeComponent', () => {
  let component: OutHomeComponent;
  let fixture: ComponentFixture<OutHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
