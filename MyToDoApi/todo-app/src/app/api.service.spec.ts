import { TestBed, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService
      ],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
