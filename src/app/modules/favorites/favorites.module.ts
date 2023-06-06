import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { PhotosListComponent } from '../common-components/photos-list/photos-list.component';
import { FavoritePhotoDetailsComponent } from './components/favorite-photo-details/favorite-photo-details.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FavoritesComponent, FavoritePhotoDetailsComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    PhotosListComponent,
    MatButtonModule,
  ],
})
export class FavoritesModule {}
