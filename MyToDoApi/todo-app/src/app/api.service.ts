import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionService } from './session.service';

const API_URL = environment.apiUrl+"/todoes";
const API_AUTHORIZATION_URL = environment.apiUrl+ "/account";

@Injectable()
export class ApiService {

   options : HttpHeaders =  this.getRequestHeaders();

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {    
  }
  public signIn(username: string, password: string) : any{
    return this.http
      .post(API_AUTHORIZATION_URL + '/login', {
        username,
        password
      })
      .map(response => response)
      .catch(this.handleError);
  }

   // API: GET /todos
   public getAllTodos(): Observable<Todo[]> {
    return this.http

      .get<Todo[]>(API_URL, { headers: this.options})
      .catch(this.handleError);
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(API_URL, todo)
      .catch(this.handleError);
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get<Todo>(API_URL + '/' + todoId)
      .catch(this.handleError);
  }
  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put<Todo>(API_URL + '/' + todo.id, todo)
      .catch(this.handleError);
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete<null>(API_URL + '/' + todoId)
      .catch(this.handleError);
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  private getRequestHeaders() : HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.session.accessToken
    });
    return headers;
  }
}
