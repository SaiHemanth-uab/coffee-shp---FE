import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  // CategoryType:string='';
  // name:string='';
  Menudata: any;
  // imageUrl:any='';
  newCategory = {
    id: '',
    CategoryType: '',
    name: '',
    imageUrl: '',
  };

  constructor(private menuService: MenuService, private router: Router) {}
  menuData: Array<any> = [];
  ionViewWillEnter() {
    if (
      !sessionStorage.getItem('role') ||
      sessionStorage.getItem('role') !== 'admin'
    ) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit() {
    this.getMenuData();
  }
  getMenuData() {
    this.menuService.getMenuList().subscribe((data: any) => {
      this.menuData = data.data;
      console.log(this.menuData, ',menu');
    });
  }
  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }
  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newCategory.imageUrl = reader.result as string;
    };
  }
  Submit() {
    this.newCategory.id = this.newCategory.name;
    console.log(JSON.stringify(this.newCategory));
    const { CategoryType, ...rest } = this.newCategory;
    this.menuService.CreateCategoryByMenu(CategoryType, rest).subscribe({
      next: (data: any) => {
        this.router.navigate(['dashboard']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  AddNewItem(Item: any) {
    this.Menudata[Item.CategoryType].categories.push(Item);
    console.log(this.Menudata, 'item');
    localStorage.setItem('newItem', JSON.stringify(this.Menudata));
    this.router.navigate(['dashboard']);
  }
}
