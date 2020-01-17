import { TestBed, async, inject } from '@angular/core/testing';

import { CanActivateTodosGuard } from './can-activate-todos.guard';

describe('CanActivateTodosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateTodosGuard]
    });
  });

  it('should ...', inject([CanActivateTodosGuard], (guard: CanActivateTodosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
