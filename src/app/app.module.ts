import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomTableComponent } from './custom-table/custom-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomButtonComponent,
    CustomTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
