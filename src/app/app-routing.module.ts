import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LoginComponent } from './pages/log-in/log-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavComponent } from './pages/nav/nav.component';

const routes: Routes = [
  { path: '', component: NavComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio-login', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
