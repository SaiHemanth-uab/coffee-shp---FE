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
  // Category:string='';
  Menudata:any;
  // imageC:any='';
  newCategory={
    id:'',
    CategoryType:'',
    Category:'',
    imageC:""

  }

  constructor(private menuService:MenuService,private router:Router) { }
  menuData: Array<any> = [];
  
  ngOnInit() {
    this.getMenuData();
  }
  getMenuData(){
    this.menuService.getMenuList().subscribe((data:any)=>{
            this.menuData = data.data;
            console.log(this.menuData, ',menu');
    });
  }
  fileSelected(event:any){
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }
  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.newCategory.imageC= reader.result as string;
    };
  }
  Submit(){
    this.newCategory.id=this.newCategory.Category;
    console.log(this.newCategory);
    this.AddNewItem(this.newCategory)

  }
  AddNewItem(Item:any){
    this.Menudata[Item.CategoryType].categories.push(Item);
    console.log(this.Menudata,"item");
     localStorage.setItem('newItem',JSON.stringify(this.Menudata));
     this.router.navigate(['dashboard']);
  }
}
