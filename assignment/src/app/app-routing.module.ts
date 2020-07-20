import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstComponent } from './components/first/first.component';
import { SecondComponent } from './components/second/second.component';
import { ThirdComponent } from './components/third/third.component';
import { ForthComponent } from './components/forth/forth.component';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 't-2', component: SecondComponent },
  { path: 't-3', component: ThirdComponent },
  { path: 't-4', component: ForthComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
