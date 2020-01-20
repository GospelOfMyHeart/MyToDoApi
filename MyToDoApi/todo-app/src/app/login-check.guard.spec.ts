import { TestBed, async, inject } from '@angular/core/testing';

import { LoginCheckGuard } from './login-check.guard';

describe('LoginCheckGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginCheckGuard]
    });
  });

  it('should ...', inject([LoginCheckGuard], (guard: LoginCheckGuard) => {
    expect(guard).toBeTruthy();
  }));
});
