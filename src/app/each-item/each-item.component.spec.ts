import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachItemComponent } from './each-item.component';

describe('EachItemComponent', () => {
  let component: EachItemComponent;
  let fixture: ComponentFixture<EachItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EachItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
