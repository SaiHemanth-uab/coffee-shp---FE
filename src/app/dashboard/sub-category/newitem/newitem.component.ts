import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.scss'],
})
export class NewitemComponent implements OnInit {
  constructor(
    private location: Location,
    private menuService: MenuService,
    private router: Router
  ) {}
  categroryName = '';
  ngOnInit() {
    this.categroryName = this.router.url.split('@')[1].split('/')[0];
    console.log(this.categroryName);
  }
  Submit(form: any) {
    if (form.valid) {
      this.newItem['category_id'] = this.categroryName;
      this.newItem['itemid'] = this.newItem['name'].replaceAll(' ', '');
      this.menuService
        .createItedmByCategory(this.categroryName, this.newItem)
        .subscribe({
          next: (resp: any) => {
            this.backPage();
          },
          error: (error: any) => {},
        });
    } else {
      alert('Please Enter the Valid URL');
    }

    console.log(this.newItem);
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

    //     {
    //       large: '',
    //       price: '',
    //       unit: '',
    //       availableInStock: false,
    //       isSelected: 0,
    //     },
  }
  backPage() {
    this.location.back();
  }
}
