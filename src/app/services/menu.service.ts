import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(public http: HttpClient) {}
  getMenu(): any {
    return this.http.get('assets/sample.json');
  }
  getCustomersData(): any {
    return this.http.get('assets/customers.json');
  }
  getMenuList() {
    return this.http.get('http://localhost:8080/api/menu');
  }
  getMenuCategoryItemList(id: string) {
    return this.http.get(`http://localhost:8080/api/${id}/items`);
  }
  createItedmByCategory(id: any, data: any) {
    ///api/create/:category/item
    return this.http.put(`http://localhost:8080/api/create/${id}/item`, data);
  }
  CreateCategoryByMenu(type: string, payload: any) {
    //http://localhost:8080/api/Drinks
    return this.http.post(`http://localhost:8080/api/${type}`, payload);
  }
  getMenuItemById(section: string, itemid: string) {
    return this.http.get(
      `http://localhost:8080/api/menu/listItems/${section}/${itemid}`
    );
  }
  login(logdata: any): any {
    return this.http.post('http://localhost:8080/api/login', logdata);
  }
  signUp(userdata: any) {
    return this.http.post('http://localhost:8080/api/signup', userdata);
  }
  // updateItem(category:any,data:any):any{
  //   return this.http.put(`http://localhost:8080/api/${category}`,data)
  // }

  createOrder(payload: any) {
    console.log(payload);
    return this.http.post(
      'http://localhost:8080/api/cart/customer_order',
      payload
    );
  }

  getCustomerOrders() {
    return this.http.get('http://localhost:8080/api/cart/customers_orders');
  }
  getAllUsers() {
    return this.http.get('http://localhost:8080/api/userdata');
  }
}
