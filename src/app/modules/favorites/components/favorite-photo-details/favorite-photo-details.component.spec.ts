import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePhotoDetailsComponent } from './favorite-photo-details.component';

describe('FavoritePhotoDetailsComponent', () => {
  let component: FavoritePhotoDetailsComponent;
  let fixture: ComponentFixture<FavoritePhotoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritePhotoDetailsComponent]
    });
    fixture = TestBed.createComponent(FavoritePhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
