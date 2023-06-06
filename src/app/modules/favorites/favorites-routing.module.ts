import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritePhotoDetailsComponent } from './components/favorite-photo-details/favorite-photo-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: FavoritePhotoDetailsComponent,
  },
  {
    path: '',
    component: FavoritesComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
