import {
  Component,
  HostListener,
  OnInit,
  ChangeDetectorRef,
  ViewChildDecorator,
  NgZone,
  ChangeDetectionStrategy,
  ApplicationRef,
} from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  constructor(
    public router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private menuService: MenuService,
    private appRef: ApplicationRef
  ) {}
  role: any = '';
  userName = '';
  notificationCount = 0;
  isNotificationLoaded = false;
  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this.userName = JSON.parse(
      sessionStorage.getItem('userInfo') as any
    ).displayName;

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.onFetchNotifications();
      }

      if (event instanceof NavigationEnd) {
        this.role = sessionStorage.getItem('role');
        this.onFetchNotifications();
      }
    });
    this.onFetchNotifications();
  }
  @HostListener('click', ['$event'])
  onAnyAction(event: any) {
    this.role = sessionStorage.getItem('role');
  }

  onFetchNotifications() {
    if (this.role && this.role == 'admin') {
      this.menuService.getNotificationCount().subscribe({
        next: (data: any) => {
          this.appRef.tick();
          this.changeDetectorRef.detectChanges();
          this.changeDetectorRef.markForCheck();
          this.notificationCount = data.data | 0;
          this.isNotificationLoaded = true;
          this.appRef.tick();
          this.changeDetectorRef.detach();
          this.changeDetectorRef.detectChanges();
          this.changeDetectorRef.markForCheck();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  ionViewDidEnter() {}

  customerOrders() {
    this.router.navigate(['customer-orders']);
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  logout() {
    this.router.navigate(['/login']);
  }
  goToCart() {
    this.router.navigate(['/dashboard/cart-section']);
  }
}
