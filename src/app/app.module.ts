import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatorPipe } from './paginator.pipe';
import { AppRoutingModule } from './app-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { CarParkComponent } from './car-park/car-park.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserChangeComponent } from './user-change/user-change.component';

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
    UserChangeComponent
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
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
