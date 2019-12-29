import { UploadComponent } from './components/upload/upload.component';
//import { AuthGuard } from './auth.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { PostEjercicioComponent } from './components/post-ejercicio/post-ejercicio.component';
import { PendientesComponent } from './components/pendientes/pendientes.component';



const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'ejercicios', component : EjerciciosComponent},
  {path : 'posts/:id', component : PostEjercicioComponent},
  {path : 'registro', component : RegistroComponent},
  {path : 'login', component : LoginComponent},
  {path : 'perfil', component : PerfilComponent},
  {path : 'upload', component : UploadComponent},
  {path : 'pendientes', component : PendientesComponent},
 // {path : 'lazy', loadChildren : './components/lazy/lazy.module#LazyModule', canActivate : [AuthGuard]},  
  {path : '**', redirectTo : 'home'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 