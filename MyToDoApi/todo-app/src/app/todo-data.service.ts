import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId: number = 0;
  todos: Todo[] = [];
  constructor(
    private api: ApiService
  ) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.api.createTodo(todo);
  }

  deleteTodoById(todoId: number): Observable<Todo> {
    return this.api.deleteTodoById(todoId);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.api.updateTodo(todo);
  }
  
  getAllTodos(): Observable<Todo[]> {
    return this.api.getAllTodos();
  }
  // Simulate GET /todos/:id
  getTodoById(todoId: number): Observable<Todo> {
    return this.api.getTodoById(todoId);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    todo.complete = !todo.complete;
    return this.api.updateTodo(todo);
  }
}
