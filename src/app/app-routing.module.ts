import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LoginComponent } from './pages/log-in/log-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './pages/nav/nav.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ReservaComponent } from './pages/reserva/reserva.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard/:userId', component: DashboardComponent },
  { path: 'reserva', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
