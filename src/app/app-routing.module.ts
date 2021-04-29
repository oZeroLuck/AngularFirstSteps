import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomepageComponent } from './pages/admin-homepage/admin-homepage.component';
import { CarParkComponent } from './pages/car-park/car-park.component';
import { FormComponent } from './pages/form/form.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ResFormComponent } from './pages/res-form/res-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AdminAuthGuard } from './admin-auth-guard.service';
import { BasicAuthGuard } from './basic-auth-guard.service';
import {ModalBasicComponent} from './components/modal-password/modal-basic.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: NavBarComponent, canActivate: [BasicAuthGuard]},
  {path: 'homepage/customers',
    children: [
      {path: '', component: AdminHomepageComponent, canActivate: [AdminAuthGuard]},
      {path: 'profile/:id', component: ProfileComponent},
      {path: 'reservations', canActivate: [BasicAuthGuard], children: [
          {path: ':userId', children: [
              {path: '', component: ReservationsComponent},
              {path: ':action', component: ResFormComponent},
              {path: ':action/:id', component: ResFormComponent}
            ]},
        ]},
      {path: ':class/:action', component: FormComponent},
      {path: ':class/:action/:id', component: FormComponent},
    ]},
  {path: 'carPark', canActivate: [BasicAuthGuard],
    children: [
      {path: '', component: CarParkComponent},
      {path: ':class/:action', component: FormComponent},
      {path: ':class/:action/:id', component: FormComponent},
    ]},
  {path: 'profile', component: ProfileComponent, canActivate: [BasicAuthGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
