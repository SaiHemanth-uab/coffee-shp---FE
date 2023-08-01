import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  jsonData: any = undefined;
  isOneItemSelected = false;
  selectedList: any[] = [];
  role: string | null = '';
  constructor(public menuService: MenuService, private router: Router) {
    // if (sessionStorage.getItem('cartData')) {
    //   this.selectedList = JSON.parse(sessionStorage.getItem('cartData') as any);
    // }
  }
  ionViewWillEnter() {
    this.role = sessionStorage.getItem('role');
  }

  ionViewDidEnter() {
    // Subscribe to the NavigationEnd event to detect when the component is entered
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navigationEvent = event as NavigationEnd;
        if (navigationEvent.url.startsWith('/dashboard/sub-category/')) {
          // Reload the page when the URL starts with the specific pattern
          window.location.reload();
        }
      }
    });
  }
  getMenuData() {
    let categoryId_typeOffood = this.router.url.split('sub-category/')[1];
    let footType = categoryId_typeOffood.split('@')[0];
    let categoryId = categoryId_typeOffood.split('@')[1];

    this.menuService
      .getMenuCategoryItemList(categoryId)
      .subscribe((data: any) => {
        this.jsonData;
        if (data && data.data) this.jsonData = data.data;
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
        console.log(dup_json[idx], idx);
        if (dup_json[idx].DefaultSelectedSize < 0) {
          dup_json[idx].DefaultSelectedSize = i;
        }
        dup_json[idx].sizes[i] = { ...item.itemInfo };
      }
    });
    this.jsonData = dup_json;
  }
  async ngOnInit() {
    if (sessionStorage.getItem('cartData')) {
      this.selectedList = JSON.parse(sessionStorage.getItem('cartData') as any);
      sessionStorage.removeItem('cardData');
    }

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
    const mainPath = parts[1];

    this.router.navigate([mainPath, 'cart-section']);
  }
  IncreseQuantity(item: any, j: number) {
    item.sizes[j].isSelected += 1;
    console.log(this.selectedList, item);
    this.onCheckInSelectedListAndReplace(item);
    if (this.selectedList.length > 0) this.isOneItemSelected = true;
    sessionStorage.setItem('cartData', JSON.stringify(this.selectedList));
  }
  onCheckInSelectedListAndReplace(ipitem: any) {
    this.selectedList.forEach((item: any) => {
      if (item.itemId === ipitem.itemid)
        item.itemInfo = ipitem.sizes.filter(
          (x: any) => x.size == item.itemInfo.size
        )[0];
    });
  }
  DecreseQuantity(item: any, j: number) {
    if (item.sizes[j].isSelected > 0) {
      item.sizes[j].isSelected -= 1;
      if (item.sizes[j].isSelected < 1) {
        this.selectedList = this.selectedList.filter(
          (obj) => obj.itemInfo.isSelected > 0
        );

        console.log(item.sizes[j]);
      } else {
        this.onCheckInSelectedListAndReplace(item);
      }
    }
    // console.log(this.selectedList);
    // this.selectedList = this.selectedList.filter(
    //   (x) => x.itemInfo.isSelected > 0
    // );
    // console.log(this.selectedList);
    console.log(this.selectedList, item, j);
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
