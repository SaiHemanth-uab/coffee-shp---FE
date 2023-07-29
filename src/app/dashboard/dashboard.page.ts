import { Component, OnInit } from "@angular/core";
import { MenuService } from "../services/menu.service";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  menuData: Array<any> = [];
  constructor(public menuService: MenuService, public router: Router) {
  }

  ngOnInit() {
    if(localStorage.getItem('newItem')){
      this.menuData=JSON.parse(localStorage.getItem('newItem')??'');
      localStorage.removeItem('newItem');
      console.log(this.menuData,"local")
    }
    else{
      this.getMenuData();
    }
     
    
  }
  getMenuData() {
    this.menuService.getMenu().subscribe((data: any) => {
      this.menuData = data;
      console.log(this.menuData,",menu");
    });
  }
  openCreateForm() {
    this.router.navigate(["/dashboard/create"]);
  }
  openCategory(categoryId: any, foodType: string) {
    this.router.navigate([`/dashboard/sub-category/${foodType}@${categoryId}`]);
  }
}
