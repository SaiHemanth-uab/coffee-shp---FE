import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage
  implements OnInit, AfterContentChecked, OnChanges, AfterViewInit
{
  ionicForm: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  isLoading = false;
  windowSize = 600;
  isToastOpen = false;

  submitButtonDetals = {
    submitBtnInfo: {
      buttonName: 'Sign up',
      buttonColor: 'success btn-success-dark',
    },
    extraLinks: [
      {
        linkText: 'Already have Account ?',
        redirectUrl: '/login',
      },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public menuService: MenuService,
    private toastController: ToastController
  ) {}
  formData: any;
  ngOnChanges() {
    this.cdr.detach();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  ngAfterViewInit() {
    this.cdr.detach();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  ionViewWillEnter() {
    sessionStorage.clear();
  }
  ngOnInit() {
    // let checkJWT = sessionStorage.getItem('access_token');
    // let haveRefreshToken = localStorage.getItem('refresh_token');
    // let refreshed = false;
    // if (checkJWT || haveRefreshToken) {
    // }

    this.formData = [
      {
        label: 'User Name',
        type: 'text',
        alias: 'username',
        validators: [
          {
            key: 'required',
            value: true,
            customMessage: '',
          },
          {
            key: 'minlength',
            value: 3,
            customMessage: 'Password should be minimum 3 charecter length',
          },
        ],
        value: '',
      },
      {
        label: 'Email',
        type: 'email',
        alias: 'email',
        validators: [
          {
            key: 'required',
            value: true,
            customMessage: '',
          },
          {
            key: 'email',
            value: true,
            customMessage: `Please Enter the valid Email.`,
          },
        ],
        value: '',
      },
      {
        label: 'Password',
        type: 'password',
        alias: 'password',
        validators: [
          {
            key: 'required',
            value: true,
            customMessage: '',
          },
          {
            key: 'minlength',
            value: 5,
            customMessage: 'Password should be minimum 5 charecter length',
          },
        ],
        value: '',
      },
    ];
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  goToDashBoard() {
    // return this.router.navigate(['todo-dashboard']);
  }

  ngAfterContentChecked() {
    this.windowSize = window.innerWidth;
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Account Created Successfully !!!',
      duration: 1500,
      position: 'bottom',
      color: 'dark',
      cssClass: 'my-toast',
    });

    await toast.present();
  }
  isSubmittedForm(event: any) {
    if (event.status && event.status == 'VALID') {
      const payload: any = {
        ...event.value,
        role: 'user',
      };

      this.menuService.signUp(payload).subscribe(
        (success) => {
          this.presentToast('bottom');
          this.router.navigate(['/login']);
        },
        (err) => {
          console.log(err, 'Got an error');
        }
      );
    }
  }
}
