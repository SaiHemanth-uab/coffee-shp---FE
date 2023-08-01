import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  menuData: Array<any> = [];
  constructor(public menuService: MenuService, public router: Router) {}

  ngOnInit() {
    this.getMenuData();
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  async ionViewDidEnter() {
    console.log('ionViewDidEnter');
    await this.getMenuData();
  }
  getMenuData() {
    this.menuService.getMenuList().subscribe((data: any) => {
      this.menuData = data.data;
    });
  }
  openCreateForm() {
    this.router.navigate(['/dashboard/create']);
  }
  openCategory(categoryId: any, foodType: string) {
    this.router.navigate([`/dashboard/sub-category/${foodType}@${categoryId}`]);
  }
}
