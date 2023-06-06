import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import {
  NavigationItemId,
  NavigationItemModel,
} from 'src/app/models/navigation-item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public navigationItems: NavigationItemModel[] = [
    {
      id: NavigationItemId.PHOTOS,
      title: 'Photos',
      route: '/',
    },
    {
      id: NavigationItemId.FAVORITES,
      title: 'Favorites',
      route: '/favorites',
    },
  ];
  public activeItem$: Observable<NavigationItemModel | undefined> =
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        return this.getActiveApplicationByRoute(event.urlAfterRedirects);
      })
    );

  constructor(private router: Router) {}

  private getActiveApplicationByRoute(
    url: string
  ): NavigationItemModel | undefined {
    const items = this.navigationItems.filter((item) =>
      url.startsWith(item.route)
    );

    if (items?.length > 1) {
      return items.find((item) => item.route !== '/');
    }

    return items[0];
  }
}
