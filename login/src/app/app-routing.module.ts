import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterComponentComponent } from './pages/auth/register-component/register-component.component';
import { BienvenidoComponent } from './pages/principal/bienvenido/bienvenido.component';
import { CanActivateGuard } from './utils/guards/can-activate.guard';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { GenerarSolicitudComponent } from './pages/generar-solicitud/generar-solicitud.component';

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
    path: "principal",
    component: LayoutAdminComponent,
    canActivate: [CanActivateGuard]
  },
  {
    path: "solicitud",
    children: [
      {
        path: "generar-solicitud",
        component: GenerarSolicitudComponent
      }
    ],
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
