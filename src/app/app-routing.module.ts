import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHomepageComponent } from './pages/admin-homepage/admin-homepage.component';
import { CarParkComponent } from './pages/car-park/car-park.component';
import { FormComponent } from './pages/form-page/form.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ResFormComponent } from './pages/res-form/res-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestComponent} from './fullstacktest/test/test.component';

import { AdminAuthGuard } from './resources/services/authentication/admin-auth-guard.service';
import { BasicAuthGuard } from './resources/services/authentication/basic-auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/test/Mark', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: NavBarComponent, canActivate: [BasicAuthGuard]},
  {path: 'homepage/customers', canActivate: [AdminAuthGuard],
    children: [
      {path: '', component: AdminHomepageComponent, canActivate: [AdminAuthGuard]},
      {path: 'profile/:id', canActivate: [BasicAuthGuard], component: ProfileComponent},
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
      {path: ':class/:action', component: FormComponent, canActivate: [AdminAuthGuard]},
      {path: ':class/:action/:id', component: FormComponent, canActivate: [AdminAuthGuard]},
    ]},
  {path: 'profile', component: ProfileComponent, canActivate: [BasicAuthGuard]},
  {path: 'test/:userName', component: TestComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
