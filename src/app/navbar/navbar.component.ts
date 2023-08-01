import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
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
    console.log('sjhgd');
    this.router.navigate(['/dashboard/cart-section']);
  }
}
