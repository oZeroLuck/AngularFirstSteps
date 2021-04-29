import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomTableComponent} from './components/custom-table/custom-table.component';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorPipe } from './resources/pipes/paginator.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AdminHomepageComponent } from './pages/admin-homepage/admin-homepage.component';
import { CarParkComponent } from './pages/car-park/car-park.component';
import { LoginComponent } from './pages/login/login.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './resources/services/in-memory-data.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormComponent } from './pages/form/form.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { FormsModule } from '@angular/forms';
import { ResFormComponent } from './pages/res-form/res-form.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ModalBasicComponent } from './components/modal-password/modal-basic.component';

export function tokenGetter(): any {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    CustomTableComponent,
    PaginatorPipe,
    AdminHomepageComponent,
    CarParkComponent,
    LoginComponent,
    NavBarComponent,
    FormComponent,
    ReservationsComponent,
    ResFormComponent,
    ProfileComponent,
    ModalBasicComponent,
    ModalBasicComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatTableModule,
    NgbModule,
    MatButtonModule,
    MatPaginatorModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
