import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { TodosComponent } from './../todos/todos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosResolver } from '../todos.resolver';
import { SignInComponent } from '../sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'todos',
    component: TodosComponent,
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
