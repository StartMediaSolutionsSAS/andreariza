import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectorComponent } from './connector/connector.component';


const routes: Routes = [
  {path:'', component: ConnectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
