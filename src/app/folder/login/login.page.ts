import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage
  implements OnInit, AfterContentChecked, OnChanges, AfterViewInit
{
  ionicForm: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  isLoading = false;
  windowSize = 600;
  isToastOpen = false;
  @Output() OpenMenu = new EventEmitter();
  submitButtonDetals = {
    submitBtnInfo: {
      buttonName: 'Log in',
      buttonColor: 'success btn-success-dark',
    },
    extraLinks: [
      {
        linkText: "don't have account ?",
        redirectUrl: '/signup',
      },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService,
    private toastController: ToastController,
    private toastService:ToastService
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
  ngOnInit() {
    sessionStorage.removeItem('cardData');
    // let checkJWT = sessionStorage.getItem('access_token');
    // let haveRefreshToken = localStorage.getItem('refresh_token');
    // let refreshed = false;
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
  ionViewWillEnter() {
    sessionStorage.clear();
  }
  goToDashBoard() {
    return this.router.navigate(['/dashboard']);
  }

  ngAfterContentChecked() {
    this.windowSize = window.innerWidth;
  }
  toaster() {
    this.isToastOpen = true;
    console.log('toaster');
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Successfully logged In !!!',
      duration: 1500,
      position: 'bottom',
      color: 'dark',
      cssClass: 'my-toast',
    });

    await toast.present();
  }

  isSubmittedForm(event: any) {
    if (event.valid) {
      this.isToastOpen = true;
      const payload: any = {
        ...event.value,
      };
      this.menuService.login(payload).subscribe({
        next: (res: any) => {
          this.isSubmitted = !this.isSubmitted;
          sessionStorage.setItem('userInfo', JSON.stringify(res.data.user));
          this.presentToast('bottom');
          this.goToDashBoard();
          this.ionicForm.reset();
        },
      //   error: (error: { message: string; status: any }) => {
      //     this.toastService.presentToast(error);
      //   },
      // });
        error: (er:any) => {
      this.toastService.presentToast(er.message);
       console.log(er.message,er)
       
  }});
    }
  }
}
