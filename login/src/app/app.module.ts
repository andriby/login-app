import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterComponentComponent } from './pages/auth/register-component/register-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BienvenidoComponent } from './pages/principal/bienvenido/bienvenido.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { GenerarSolicitudComponent } from './pages/generar-solicitud/generar-solicitud.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponentComponent,
    BienvenidoComponent,
    LayoutAdminComponent,
    GenerarSolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
