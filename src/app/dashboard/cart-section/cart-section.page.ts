import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-cart-section',
  templateUrl: './cart-section.page.html',
  styleUrls: ['./cart-section.page.scss'],
})
export class CartSectionPage implements OnInit {
  cartItems: any = [];
  TotalPrice = 0;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('cartData')) {
      let data: any = sessionStorage.getItem('cartData');
      this.cartItems = JSON.parse(data);
    } else {
      this.cartItems = [];
    }

    this.calculatePrice();
  }
  onMultiply(x: any, y: any) {
    return Number(x) * Number(y);
  }
  calculatePrice() {
    if (this.cartItems) {
      for (let i of this.cartItems) {
        this.TotalPrice += +i.itemInfo.price * i.itemInfo.isSelected;
      }
    }
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }
  async ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }
  order() {
    let userInfo: any = JSON.parse(sessionStorage.getItem('userInfo') as any);
    let preparePayload = {
      userId: userInfo ? userInfo['uid'] : '',
      username: userInfo ? userInfo['displayName'] : '',
      email: userInfo ? userInfo['email'] : '',
      orderedItems: this.cartItems,
      ordered_time: new Date(),
      orderId: new Date().getTime().toString(36),
    };
    this.menuService.createOrder(preparePayload).subscribe({
      next: (data) => {
        alert(
          'Your Order was successfully placed Please wait for a while to recieve your Items!'
        );
        sessionStorage.removeItem('cartData');
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  clickToHome() {
    this.router.navigate(['/dashboard']);
  }
  addTax(price: any) {
    return Number(price) + Number(price) * 0.1;
  }
}
