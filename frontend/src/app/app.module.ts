import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {ModalModule} from 'ngb-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PerfilComponent } from './components/perfil/perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UploadComponent } from './components/upload/upload.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { PostEjercicioComponent } from './components/post-ejercicio/post-ejercicio.component';
import { PendientesComponent } from './components/pendientes/pendientes.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { AdminPostComponent } from './components/admin-post/admin-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    PerfilComponent,
    NavbarComponent,
    UploadComponent,
    EjerciciosComponent,
    PostEjercicioComponent,
    PendientesComponent,
    ComprarComponent,
    AdminPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
