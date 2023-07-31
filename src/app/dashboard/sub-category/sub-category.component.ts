import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  jsonData: any = undefined;
  isOneItemSelected = false;
  selectedList: any[] = [];

  // @HostListener('window:beforeunload') storeItems() {
  //   console.log('called');
  //   if (this.selectedList) {
  //     sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
  //   }
  // }
  // @HostListener('window:popstate', ['$event'])
  // onPopState(event: any) {
  //   if (this.selectedList) {
  //     sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
  //   }
  // }
  constructor(public menuService: MenuService, private router: Router) {
    // if (sessionStorage.getItem('cartData')) {
    //   this.selectedList = JSON.parse(sessionStorage.getItem('cartData') as any);
    // }
  }
  getMenuData() {
    let categoryId_typeOffood = this.router.url.split('sub-category/')[1];
    let footType = categoryId_typeOffood.split('@')[0];
    let categoryId = categoryId_typeOffood.split('@')[1];
    console.log(categoryId, 'categoryId');
    this.menuService
      .getMenuCategoryItemList(categoryId)
      .subscribe((data: any) => {
        this.jsonData;
        if (data && data.data) this.jsonData = data.data;
        // this.jsonData = data[footType].categories.filter(
        //   (x: any, i: any) => x.id == categoryId
        // )[0].listOfItems;
        this.onRearrangeCartInfo();
      });
  }

  onRearrangeCartInfo() {
    if (this.selectedList.length > 0) {
      this.selectedList.forEach((item: any) => {
        let idx = this.jsonData.findIndex((x: any) => x.itemid == item.itemId);
        console.log(idx);
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
        console.log(dup_json[idx], idx);
        if (dup_json[idx].DefaultSelectedSize < 0) {
          dup_json[idx].DefaultSelectedSize = i;
        }
        dup_json[idx].sizes[i] = { ...item.itemInfo };
      }
    });
    this.jsonData = dup_json;
    console.log(dup_json);
  }
  ngOnInit() {}
  async ionViewDidEnter() {
    if (sessionStorage.getItem('cartData')) {
      this.selectedList = JSON.parse(sessionStorage.getItem('cartData') as any);
    }
    console.log(this.selectedList);
    if (this.selectedList.length > 0) this.isOneItemSelected = true;

    await this.getMenuData();
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
    sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
    const parts = this.router.url.split('/');
    const mainPath = parts[1]; // This should be 'dashboard'
    console.log(mainPath);
    // Navigating to the 'dashboard/cart-section' route
    this.router.navigate([mainPath, 'cart-section']);

    console.log(this.router.url);
  }
  IncreseQuantity(item: any, j: number) {
    item.sizes[j].isSelected += 1;
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
    sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
  }
  DecreseQuantity(item: any, j: number) {
    if (item.sizes[j].isSelected > 0) {
      item.sizes[j].isSelected -= 1;
      if (item.sizes[j].isSelected < 1) {
        //  this.selectedList.filter((x: any) => x.)
      }
    }
    console.log(this.selectedList);
    this.selectedList = this.selectedList.filter(
      (x) => x.itemInfo.isSelected > 0
    );
    console.log(this.selectedList);

    sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
  }
  openNewItemForm() {
    this.router.navigate([`${this.router.url}/create`]);
  }
  onEdit(itemid: string) {
    this.router.navigate([`${this.router.url}/${itemid}`]);
  }
}
