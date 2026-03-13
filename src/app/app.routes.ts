import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/leaderboards/leaderboards').then(m => m.Leaderboards) }
];
