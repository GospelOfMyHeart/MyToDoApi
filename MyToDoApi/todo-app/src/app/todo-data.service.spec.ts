import { ApiMockService } from './api-mock.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import {TodoDataService} from './todo-data.service';
import { ApiService } from './api.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: ApiService,
        useClass: ApiMockService},
        TodoDataService,
      ]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

});