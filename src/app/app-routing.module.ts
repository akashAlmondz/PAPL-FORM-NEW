import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { InvalidComponent } from './components/invalid/invalid.component';

const routes: Routes = [
  { path: 'form/:uuid', component: FormComponent },
  { path: 'form-registered/:lang', component: InvalidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
