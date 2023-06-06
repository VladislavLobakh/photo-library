import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  public favoritesPhotos$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  private readonly baseUrl: string = './assets/photos/';
  private readonly maxChunks: number = 3;
  private readonly favoritePhotosKey: string = 'favoritePhotosKey';

  constructor() {
    this.favoritesPhotos$.next(this.getFavoritePhotos());
  }

  addFavoritePhoto(photo: string): void {
    const existedPhoto = this.favoritesPhotos$.value.find(
      (favoritePhoto) => favoritePhoto === photo
    );

    if (!existedPhoto) {
      this.favoritesPhotos$.value.push(photo);
      localStorage.setItem(
        this.favoritePhotosKey,
        JSON.stringify(this.favoritesPhotos$.value)
      );
    }
  }

  removePhotoFromFavorites(photo: string | undefined): void {
    const existedPhotoIndex = this.favoritesPhotos$.value.findIndex(
      (favoritePhoto) => favoritePhoto === photo
    );

    this.favoritesPhotos$.value.splice(existedPhotoIndex, 1);
    localStorage.setItem(
      this.favoritePhotosKey,
      JSON.stringify(this.favoritesPhotos$.value)
    );
  }

  loadRandomPhotos(chunkNumber: number): Observable<string[]> {
    return timer(2000).pipe(
      map(() => {
        if (chunkNumber > this.maxChunks) {
          return [];
        }

        const imgNamePrefix = chunkNumber || '';
        return new Array(10).fill(null).reduce((arr, item, index) => {
          arr.push(`${this.baseUrl}${imgNamePrefix}${index}.jpeg`);
          return arr;
        }, []);
      })
    );
  }

  getPhotoUrlFromId(id: string): string {
    return `${this.baseUrl}${id}.jpeg`;
  }

  getPhotoIdFromUrl(url: string): string {
    const urlChunks = url.split('/');
    const imgName = urlChunks[urlChunks.length - 1];
    return imgName.split('.')[0];
  }

  private getFavoritePhotos(): string[] {
    const photosString = localStorage.getItem(this.favoritePhotosKey);
    return photosString ? JSON.parse(photosString) : [];
  }
}
