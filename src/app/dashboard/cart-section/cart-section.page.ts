import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-cart-section",
  templateUrl: "./cart-section.page.html",
  styleUrls: ["./cart-section.page.scss"],
})
export class CartSectionPage implements OnInit {
  cartItems: any = [];
  TotalPrice = 0;
  // @HostListener("window:beforeunload") storeCartItems() {
  //   if (this.cartItems) {
  //     console.log("sai");
  //     sessionStorage.setItem("cartData", JSON.stringify(this.cartItems));
  //   }
  // }
  constructor(private route: ActivatedRoute, private router: Router) {
    // if (sessionStorage.getItem("cartData")) {
    //   this.cartItems = JSON.parse(sessionStorage.getItem("cartData") ?? "");
    //   sessionStorage.removeItem("cartData");
    // } else {
    //   this.cartItems = this.router.getCurrentNavigation()?.extras.state;
    //   this.cartItems = this.cartItems.cartItems;
    // }
  }

  ngOnInit() {
    if (sessionStorage.getItem("cartData")) {
      let data: any = sessionStorage.getItem("cartData");
      this.cartItems = JSON.parse(data);
      console.log(this.cartItems);
    } else {
      this.cartItems = [];
    }

    this.calculatePrice();
  }
  calculatePrice() {
    if (this.cartItems) {
      for (let i of this.cartItems) {
        this.TotalPrice += ((+i.itemInfo.price)*i.itemInfo.isSelected);
        console.log(this.TotalPrice,i);
      }
    }
  }
}
