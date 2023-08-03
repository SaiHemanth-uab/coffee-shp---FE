import {
  Component,
  HostListener,
  OnInit,
  ViewChildDecorator,
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
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router, private menuService: MenuService) {}
  role: any = '';
  userName = '';
  notificationCount = 0;
  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this.userName = JSON.parse(
      sessionStorage.getItem('userInfo') as any
    ).displayName;

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.onFetchNotifications();
        console.log(event, 'sjdh');
      }

      if (event instanceof NavigationEnd) {
        this.onFetchNotifications();
        // Hide loading indicator
        console.log(event, 'sjdh');
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }
  @HostListener('click', ['$event'])
  onAnyAction(event: any) {
    this.role = sessionStorage.getItem('role');
  }

  onFetchNotifications() {
    //newNotifications
    this.menuService.getNotificationCount().subscribe({
      next: (data: any) => {
        this.notificationCount = data.data | 0;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
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
