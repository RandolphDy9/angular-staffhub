import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(module => module.HomepageModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(module => module.EmployeesModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
