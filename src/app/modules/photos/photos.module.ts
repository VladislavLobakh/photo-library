import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotosRoutingModule } from './photos-routing.module';

@NgModule({
  declarations: [PhotosComponent],
  imports: [CommonModule, PhotosRoutingModule],
})
export class PhotosModule {}
