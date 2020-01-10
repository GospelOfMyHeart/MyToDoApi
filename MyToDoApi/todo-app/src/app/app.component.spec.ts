import { ApiMockService } from './api-mock.service';
import { ApiService } from './api.service';
import { TodoDataService } from './todo-data.service';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Todo } from './todo';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[
        TodoDataService,
        {
          provide:ApiService,
          useClass:ApiMockService
        }
      ],
      schemas:[
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
