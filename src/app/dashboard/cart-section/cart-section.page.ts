import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart-section',
  templateUrl: './cart-section.page.html',
  styleUrls: ['./cart-section.page.scss'],
})
export class CartSectionPage implements OnInit {
  cartItems: any = [];
  TotalPrice = 0;
  placeOrder = false;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
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
    if (sessionStorage.getItem('cartData')) {
      let data: any = sessionStorage.getItem('cartData');
      this.cartItems = JSON.parse(data);
    } else {
      this.cartItems = [];
    }

    this.calculatePrice();
  }
  async presentToast(message = 'Order Placed Successfully !!!') {
    const toast = await this.toastController.create({
      message: message,
      duration: 8000,
      position: 'bottom',
      color: 'dark',
      cssClass: 'my-toast',
    });

    await toast.present();
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
        this.presentToast(
          `Order Placed Successfully! Please, Note it down the Order number: "${preparePayload.orderId}" and wait for your order at the counter!`
        );
        sessionStorage.removeItem('cartData');
        this.placeOrder = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  clickToHome() {
    this.placeOrder = false;
    this.router.navigate(['/dashboard']);
  }
  addTax(price: any) {
    return Number(price) + Number(price) * 0.1;
  }
  addmore() {
    this.router.navigate(['/dashboard']);
    this.placeOrder = false;
  }
  proceed() {
    this.placeOrder = true;
  }
}
