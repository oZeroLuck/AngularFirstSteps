import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AdminHomepageComponent } from './pages/admin-homepage/admin-homepage.component';
import { CarParkComponent } from './pages/car-park/car-park.component';
import { FormComponent } from './components/form/form.component';
import {ReservationsComponent} from './pages/reservations/reservations.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: NavBarComponent},
  {path: 'homepage/customers',
    children: [
      {path: '', component: AdminHomepageComponent},
      {path: ':class/:action', component: FormComponent},
      {path: ':class/:action/:id', component: FormComponent},
      {path: 'reservations/:id', component: ReservationsComponent}
    ]},
  {path: 'carPark',
    children: [
      {path: '', component: CarParkComponent},
      {path: ':class/:action', component: FormComponent},
      {path: ':class/:action/:id', component: FormComponent},
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
