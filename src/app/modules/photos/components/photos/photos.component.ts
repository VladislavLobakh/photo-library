import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, finalize, take, tap } from 'rxjs';
import { PhotosService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnDestroy {
  @ViewChild('trackLine', {
    static: true,
  })
  trackLine: ElementRef | undefined;

  public currentChunk: number = 0;
  public photos: string[] = [];
  public isLoading: boolean = true;

  private trackLineObserver: IntersectionObserver | undefined;

  constructor(
    private photosService: PhotosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRandomPhotos(this.currentChunk).subscribe((photos) => {
      this.photos = photos;
      this.observeTrackLine();
    });
  }

  ngOnDestroy(): void {
    this.trackLineObserver?.disconnect();
  }

  addFavoritePhoto(photo: string): void {
    this.photosService.addFavoritePhoto(photo);
  }

  private observeTrackLine(): void {
    let isFirstIntersection: boolean = true;

    this.trackLineObserver = new IntersectionObserver((entries, observer) => {
      const isIntersecting = entries[0].isIntersecting;

      if (isIntersecting && !isFirstIntersection) {
        this.loadNextChunk();
      }

      isFirstIntersection = false;
    }, {});

    this.trackLineObserver.observe(this.trackLine?.nativeElement);
  }

  private loadNextChunk(): void {
    if (this.isLoading) {
      return;
    }

    this.currentChunk++;
    this.loadRandomPhotos(this.currentChunk).subscribe((photos) => {
      this.photos = [...this.photos, ...photos];
    });
  }

  private loadRandomPhotos(chunk: number): Observable<string[]> {
    this.isLoading = true;
    this.cdr.markForCheck();

    return this.photosService.loadRandomPhotos(chunk).pipe(
      take(1),
      tap((photos) => {
        if (!photos.length) {
          this.trackLineObserver?.disconnect();
        }
      }),
      finalize(() => {
        this.isLoading = false;
        this.cdr.markForCheck();
      })
    );
  }
}
