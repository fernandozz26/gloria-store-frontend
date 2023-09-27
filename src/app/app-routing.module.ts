import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  
  {path: 'test', component: TestPageComponent},
  {path: 'orders', component: OrdersComponent},
  {path: "", redirectTo: "orders", pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
