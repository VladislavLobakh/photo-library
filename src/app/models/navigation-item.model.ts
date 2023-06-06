export interface NavigationItemModel {
  id: NavigationItemId;
  title: string;
  route: string;
}

export enum NavigationItemId {
  PHOTOS = 'PHOTOS',
  FAVORITES = 'FAVORITES',
}
