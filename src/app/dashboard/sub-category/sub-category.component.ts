import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService } from "src/app/services/menu.service";

@Component({
  selector: "app-sub-category",
  templateUrl: "./sub-category.component.html",
  styleUrls: ["./sub-category.component.scss"],
})
export class SubCategoryComponent implements OnInit {
  jsonData: any;
  isOneItemSelected = false;
  selectedList: any[] = [];

  @HostListener("window:beforeunload") storeItems() {
    console.log("called");
    if (this.selectedList) {
      sessionStorage.setItem("cartData", JSON.stringify(this.selectedList));
    }
  }
  @HostListener("window:popstate", ["$event"])
  onPopState(event: any) {
    if (this.selectedList) {
      sessionStorage.setItem("cartData", JSON.stringify(this.selectedList));
    }
  }
  constructor(public menuService: MenuService, private router: Router) {
    if (sessionStorage.getItem("cartData")) {
      this.selectedList = JSON.parse(sessionStorage.getItem("cartData") as any);
    }

    this.getMenuData();
  }
  getMenuData() {
    let categoryId_typeOffood = this.router.url.split("sub-category/")[1];
    let footType = categoryId_typeOffood.split("@")[0];
    let categoryId = categoryId_typeOffood.split("@")[1];
    this.menuService.getSubCategoryList(categoryId).subscribe((data: any) => {
      this.jsonData = data.data
      //this.jsonData = data[footType].categories.filter(
       // (x: any, i: any) => x.id == categoryId
      //)[0].listOfItems;
      this.onRearrangeCartInfo();
    });
  }

  onRearrangeCartInfo() {
    if (this.selectedList.length > 0) {
      this.selectedList.forEach((item: any) => {
        let idx = this.jsonData.findIndex((x: any) => x.itemid == item.itemId);
        if (idx > -1) {
          this.setWithIndex(idx, item);
        }
      });
    }
  }
  setWithIndex(idx: number, item: any) {
    let dup_json = [...this.jsonData];
    this.jsonData[idx].sizes.map((x: any, i: number) => {
      if (x.size == item.itemInfo.size) {
        if (dup_json[idx].DefaultSelectedSize == -1) {
          dup_json[idx].DefaultSelectedSize = i;
        }
        return (dup_json[idx].sizes[i] = { ...item.itemInfo });
      }
    });
  }
  ngOnInit() {
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
  }
  SelectedSize(item: any, index: number) {
    item.DefaultSelectedSize = index;
  }
  AddtoCart(item: any, i: number) {
    if (item) {
      if (item.sizes[item.DefaultSelectedSize].isSelected <= 0) {
        item.sizes[item.DefaultSelectedSize].isSelected += 1;
        this.selectedList.push(
          this.prepareItem(item, item.DefaultSelectedSize)
        );
      } else {
        item.sizes[item.DefaultSelectedSize].isSelected += 1;
      }

      console.log(this.selectedList);
      if (this.selectedList.length > 0) this.isOneItemSelected = true;
    }
  }

  prepareItem(item: any, DefaultSelectedSize: any) {
    console.log(item);
    return {
      itemId: item.itemid,
      imageUrl: item.imageUrl,
      name: item.name,
      itemInfo: item.sizes[DefaultSelectedSize],
      NumberOfItems: item.sizes[DefaultSelectedSize].isSelected,
    };
  }
  isItemExistsInCart(item: any) {}
  GotoCart() {
    console.log(this.selectedList);
    sessionStorage.setItem("cartData", JSON.stringify(this.selectedList));
    // sessionStorage.setItem("storedItems", JSON.stringify(this.jsonData));

    this.router.navigate([`${this.router.url}/cart-section`]);
  }
  IncreseQuantity(item: any, j: number) {
    item.sizes[j].isSelected += 1;
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
  }
  DecreseQuantity(item: any, j: number) {
    if (item.sizes[j].isSelected > 0) {
      item.sizes[j].isSelected -= 1;
    }
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
  }
  openNewItemForm(){
    this.router.navigate([`${this.router.url}/create`])
  }
}
