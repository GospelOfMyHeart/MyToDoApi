import { LoginCheckGuard } from './../login-check.guard';
import { CanActivateTodosGuard } from './../can-activate-todos.guard';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { TodosComponent } from './../todos/todos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosResolver } from '../todos.resolver';
import { SignInComponent } from '../sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate:[
      LoginCheckGuard
    ]
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate:[
      CanActivateTodosGuard
    ],
    resolve: {
      todos: TodosResolver
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TodosResolver]
})
export class AppRoutingModule {
}
