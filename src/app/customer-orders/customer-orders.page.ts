import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {
  customerOrders: any;

  constructor(private menuService: MenuService, private router: Router) {
    this.getCustomerOrders();
  }

  ngOnInit() {}

  getCustomerOrders() {
    this.menuService.getCustomerOrders().subscribe((res: any) => {
      this.customerOrders = res.data;
    });
  }
  ionViewWillEnter() {
    if (
      !sessionStorage.getItem('role') ||
      sessionStorage.getItem('role') !== 'admin'
    ) {
      this.router.navigate(['/dashboard']);
    }
  }

  viewItems(orderedItems: any) {
    this.router.navigate(['customer-orders/view-Orders'], {
      state: { order: JSON.stringify(orderedItems) },
    });
  }
}
