import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newitem',
  templateUrl: './newitem.component.html',
  styleUrls: ['./newitem.component.scss'],
})
export class NewitemComponent  implements OnInit {

  constructor() { }
  ngOnInit() {}
Submit(){
  
}
newItem={
  itemid:'',
  name:'',
  imageUrl:'',
  DefaultSelected:-1
}
sizeObj=[
  {
    small:'',
    price:'',
    unit:'',
    availableInStock:false,
    isSelected:0
  },
  {
    medium:'',
    price:'',
    unit:'',
    availableInStock:false,
    isSelected:0
  },
  {
    large:'',
    price:'',
    unit:'',
    availableInStock:false,
    isSelected:0
  }
]


}
