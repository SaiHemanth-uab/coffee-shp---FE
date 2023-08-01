import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.scss'],
})
export class NewitemComponent implements OnInit {
  constructor(
    private location: Location,
    private menuService: MenuService,
    private router: Router,
    private navCtrl: NavController
  ) {}
  categroryName = '';
  isEditMode = '';
  ionViewWillEnter() {
    if (
      !sessionStorage.getItem('role') ||
      sessionStorage.getItem('role') !== 'admin'
    ) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
    this.categroryName = this.router.url.split('@')[1].split('/')[0];
    this.isEditMode = this.router.url.split('@')[1].split('/')[1];
    if (this.isEditMode !== 'create') {
      this.getItemById(this.categroryName, this.isEditMode);
    }
  }
  getItemById(section: string, itemid: string) {
    this.menuService.getMenuItemById(section, itemid).subscribe({
      next: (data: any) => {
        if (data.data) this.newItem = data.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  Submit(form: any) {
    if (form.valid) {
      this.newItem['category_id'] = this.categroryName;
      this.newItem['itemid'] = this.newItem['name'].replace(' ', '');
      console.log(this.newItem, "I'm updating");
      this.menuService
        .createItedmByCategory(this.categroryName, this.newItem)
        .subscribe({
          next: (resp: any) => {
            //this.backPage();
            this.navCtrl.back();
          },
          error: (error: any) => {},
        });
    } else {
      alert('Please Enter the Valid URL');
    }
  }
  newItem = {
    itemid: '',
    name: '',
    imageUrl: '',
    category_id: '',
    DefaultSelectedSize: -1,
    sizes: [
      {
        availableInStock: true,
        discount: '0',
        isSelected: 0,
        price: '0',
        size: '',
        unit: '1',
      },
    ],
  };
  clickToremoveSize(i: number) {
    this.newItem.sizes.splice(i, 1);
  }
  clickToAddSize() {
    this.newItem.sizes.push({
      availableInStock: true,
      discount: '0',
      isSelected: 0,
      price: '0',
      size: '',
      unit: '1',
    });
  }
  backPage() {
    this.location.back();
  }
}
