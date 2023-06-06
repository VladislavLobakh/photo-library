import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosListComponent } from '../common-components/photos-list/photos-list.component';

@NgModule({
  declarations: [PhotosComponent],
  imports: [CommonModule, PhotosRoutingModule, PhotosListComponent],
})
export class PhotosModule {}
