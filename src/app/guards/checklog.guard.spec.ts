import { TestBed } from '@angular/core/testing';

import { ChecklogGuard } from './checklog.guard';

describe('ChecklogGuard', () => {
  let guard: ChecklogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChecklogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
