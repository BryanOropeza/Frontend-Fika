import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/log-in/log-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './pages/nav/nav.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PasswordComponent } from './pages/log-in/password/password.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:userId', component: DashboardComponent },
  { path: 'reserva', component: ReservaComponent },
  { path: 'restablecer', component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
