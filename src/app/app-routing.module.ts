import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { CarParkComponent } from './car-park/car-park.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin/homepage', component: AdminHomepageComponent},
  {path: 'carPark', component: CarParkComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
