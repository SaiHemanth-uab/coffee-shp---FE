import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private userSubject: BehaviorSubject<any> | any;
  public user: Observable<any> | any;
  constructor(public http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }
  login(logdata: any): any {
    return this.http.post(`${environment.baseURL}/login`, logdata).pipe(
      map((user: any) => {
        this.setSessionStorage(
          user.data._tokenResponse.refreshToken,
          user.data._tokenResponse.idToken,
          user.data._tokenResponse.expiresIn,
          user.data.user.uid,
          user.data.user.email,
          user.data.userdetails.role
        );
        this.userSubject.next(user.data._tokenResponse.refreshToken);

        return user;
      })
    );
  }
  setSessionStorage(
    refreshToken: string,
    accessToken: string,
    expiresIn: string,
    uid: string,
    email: any,
    role: any = 'user'
  ) {
    sessionStorage.setItem(`refreshToken`, refreshToken);
    sessionStorage.setItem(`accessToken`, accessToken);
    sessionStorage.setItem(`expiresIn`, expiresIn);
    sessionStorage.setItem(`uid`, uid); //uid
    sessionStorage.setItem(`email`, email);
    sessionStorage.setItem('role', role);
  }
  signUp(userdata: any) {
    return this.http.post(`${environment.baseURL}/signup`, userdata);
  }
  userValue() {
    if (sessionStorage.getItem(`accessToken`)) {
      return sessionStorage.getItem(`accessToken`);
    } else {
      return '';
    }
  }
  getMenuList() {
    return this.http.get(`${environment.baseURL}/menu`);
  }
  getMenuCategoryItemList(id: string) {
    return this.http.get(`${environment.baseURL}/${id}/items`);
  }
  createItemByCategory(id: any, data: any) {
    return this.http.put(`${environment.baseURL}/create/${id}/item`, data);
  }
  CreateCategoryByMenu(type: string, payload: any) {
    return this.http.post(`${environment.baseURL}/${type}`, payload);
  }
  getMenuItemById(section: string, itemid: string) {
    return this.http.get(
      `${environment.baseURL}/menu/listItems/${section}/${itemid}`
    );
  }

  createOrder(payload: any) {
    console.log(payload);
    return this.http.post(
      `${environment.baseURL}/cart/customer_order`,
      payload
    );
  }

  getCustomerOrders() {
    return this.http.get(`${environment.baseURL}/cart/customers_orders`);
  }
  getAllUsers() {
    return this.http.get(`${environment.baseURL}/userdata`);
  }
  logout() {
    // this.http.post<any>(`${environment.baseURL}/api/users/revoke-token`, {}, { withCredentials: true }).subscribe();
    sessionStorage.clear();

    this.userSubject.next(null);
    this.router.navigate([`/login`]);
  }
}
