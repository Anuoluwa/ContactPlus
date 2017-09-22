import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule  } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { CompanyService } from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';

const firebaseConfig = {
  apiKey: 'AIzaSyAuX6Fo7fEj9hUoLQ7_QYPdRPmSP1wDTE4',
    authDomain: 'comcontacts-fdd4c.firebaseapp.com',
    databaseURL: 'https://comcontacts-fdd4c.firebaseio.com',
    projectId: 'comcontacts-fdd4c',
    storageBucket: 'comcontacts-fdd4c.appspot.com',
    messagingSenderId: '501697754734'
};

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule ,
    AngularFireModule.initializeApp(firebaseConfig, 'Commpany'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule

  ],
  providers: [CompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
