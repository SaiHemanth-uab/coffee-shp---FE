import {
  Component,
  HostListener,
  OnInit,
  ViewChildDecorator,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}
  role: any = '';
  ngOnInit() {
    this.role = sessionStorage.getItem('role');
  }
  @HostListener('click', ['$event'])
  onAnyAction(event: any) {
    this.role = sessionStorage.getItem('role');
  }
  ionViewDidEnter() {
    this.role = sessionStorage.getItem('role');
  }

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
