import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../todo-data.service';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
 }
 public ngOnInit() {
   this.route.data.pipe(map((data) => {
    return data.todos;
   })).subscribe((todos) => {
     this.todos = todos;
   });
 }

 // addTodo(){
 //   this.todoDataService.addTodo(this.newTodo);
 //   this.newTodo = new Todo();
 // }

 onAddTodo(todo: Todo) {
   this.todoDataService
   .addTodo(todo)
   .subscribe(
     (newTodo) => {
       this.todos = this.todos.concat(newTodo);
     }
   );
 }

 // Service is now available as this.todoDataService
 onToggleTodoComplete(todo: Todo) {
   this.todoDataService
     .toggleTodoComplete(todo)
     .subscribe(
       (updatedTodo) => {
         todo = updatedTodo;
       }
     );
 }
 onRemoveTodo(todo: Todo) {
   this.todoDataService
   .deleteTodoById(todo.id)
   .subscribe(
     (_) => {
       this.todos = this.todos.filter((t) => t.id !== todo.id);
     }
   );
 }
 doSignOut() {
  this.auth.doSignOut();
  this.router.navigate(['/sign-in']);
}
}
