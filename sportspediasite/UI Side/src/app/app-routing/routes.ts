import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CricketComponent } from '../cricket/cricket.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'cricket',  component: CricketComponent },
  { path: '', redirectTo: '/cricket', pathMatch: 'full' }
  
];