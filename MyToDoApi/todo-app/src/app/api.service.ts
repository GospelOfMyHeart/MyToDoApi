import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl+"/todoes";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }
  public signIn(username: string, password: string) : any{
    return this.http
      .post(API_URL + '/sign-in', {
        username,
        password
      })
      .map(response => response)
      .catch(this.handleError);
  }

   // API: GET /todos
   public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(API_URL)
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
}
