import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterComponentComponent } from './pages/auth/register-component/register-component.component';
import { BienvenidoComponent } from './pages/principal/bienvenido/bienvenido.component';
import { CanActivateGuard } from './utils/guards/can-activate.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterComponentComponent
  },
  {
    path: "bienvenido",
    component: BienvenidoComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
