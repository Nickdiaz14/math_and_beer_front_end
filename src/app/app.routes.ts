import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/Home/home').then(m => m.Home) },
    { path: 'leaderboards', loadComponent: () => import('./features/leaderboards/leaderboards').then(m => m.Leaderboards) },
    { path: 'games', loadComponent: () => import('./features/games/games').then(m => m.Games) }
];
