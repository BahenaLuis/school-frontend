import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule   } from '@angular/forms';
import { RequestService } from './services/request.service';
import { HttpModule } from '@angular/http';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SweetAlert2Module.forRoot()   
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
