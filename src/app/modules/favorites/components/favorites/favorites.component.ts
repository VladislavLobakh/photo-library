import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  photos$ = this.photosService.favoritesPhotos$;

  constructor(
    private photosService: PhotosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public openFavoritePhoto(photo: string): void {
    const photoId = this.photosService.getPhotoIdFromUrl(photo);
    this.router.navigate([photoId], {
      relativeTo: this.activatedRoute,
    });
  }
}
