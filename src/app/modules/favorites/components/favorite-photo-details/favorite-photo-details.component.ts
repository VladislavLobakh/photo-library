import { PhotosService } from 'src/app/services/photos.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-favorite-photo-details',
  templateUrl: './favorite-photo-details.component.html',
  styleUrls: ['./favorite-photo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritePhotoDetailsComponent implements OnInit {
  imgUrl: string | undefined;

  constructor(
    private photosService: PhotosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.imgUrl = this.photosService.getPhotoUrlFromId(id);
  }

  remove(): void {
    this.photosService.removePhotoFromFavorites(this.imgUrl);
    this.router.navigate(['../'], {
      relativeTo: this.activatedRoute,
    });
  }
}
