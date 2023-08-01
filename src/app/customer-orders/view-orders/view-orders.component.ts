import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {
  viewOrderedData: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.viewOrderedData = this.router.getCurrentNavigation()?.extras.state;
    this.viewOrderedData = JSON.parse(this.viewOrderedData.order);
  }
  ionViewWillEnter() {
    if (
      !sessionStorage.getItem('role') ||
      sessionStorage.getItem('role') !== 'admin'
    ) {
      this.router.navigate(['/dashboard']);
    }
  }
}
