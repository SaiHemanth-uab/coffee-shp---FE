import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.page.html',
  styleUrls: ['./customer-orders.page.scss'],
})
export class CustomerOrdersPage implements OnInit {
  customerOrders: any;

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit() {}
  newItems = [];
  getCustomerOrders() {
    forkJoin([
      this.menuService.getNotification(),
      this.menuService.getCustomerOrders(),
    ]).subscribe((res: any) => {
      this.customerOrders = res[1].data;
      this.newItems = res[0].data;
    });
  }

  findNewOrder(orderId: string) {
    let data = this.newItems.find((x: any) => x.orderId === orderId);

    return data ? true : false;
  }
  ionViewWillEnter() {
    if (
      !sessionStorage.getItem('role') ||
      sessionStorage.getItem('role') !== 'admin'
    ) {
      this.router.navigate(['/dashboard']);
    }
    this.getCustomerOrders();
  }

  viewItems(orderedItems: any) {
    this.router.navigate(['customer-orders/view-Orders'], {
      state: { order: JSON.stringify(orderedItems) },
    });
  }
}
