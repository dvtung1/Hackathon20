import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserinputComponent } from './components/userinput/userinput.component';
import { AppRoutingModule } from './app-routing.module';
import { ResultComponent } from './components/result/result.component';
import { HomeComponent } from './components/home/home.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RecommendjobComponent } from './components/recommendjob/recommendjob.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserinputComponent,
    ResultComponent,
    HomeComponent,
    RecommendjobComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
