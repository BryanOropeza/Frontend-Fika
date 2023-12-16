import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/log-in/log-in.component';
import { DashboardComponent, FilterPipe } from './pages/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './pages/nav/nav.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PasswordComponent } from './pages/log-in/password/password.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    MainPageComponent,
    ReservaComponent,
    FilterPipe,
    PasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
