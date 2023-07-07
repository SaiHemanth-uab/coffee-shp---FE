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
    private cdr: ChangeDetectorRef
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
    let checkJWT = sessionStorage.getItem('access_token');
    let haveRefreshToken = localStorage.getItem('refresh_token');
    let refreshed = false;
    if (checkJWT || haveRefreshToken) {
      // this.authenticationService.refreshToken().subscribe({
      //   next: (res) => {
      //     setTimeout(() => {
      //       this.ngxService.stop();
      //       this.goToDashBoard();
      //     }, 5000);
      //     this.isLoading = false;
      //     refreshed = true;
      //   },
      //   error: (error) => {
      //     sentryError(error);
      //     this.ngxService.stop();
      //     this.isLoading = false;
      //     refreshed = false;
      //   },
      // });
    }
    // if (!refreshed) {
    //   this.formData = [
    //     {
    //       label: 'Email',
    //       type: 'email',
    //       alias: 'email',
    //       validators: [
    //         {
    //           key: 'required',
    //           value: true,
    //           customMessage: '',
    //         },
    //         {
    //           key: 'email',
    //           value: true,
    //           customMessage: `Please Enter the valid Email.`,
    //         },
    //       ],
    //       value: '',
    //     },

    //     {
    //       label: 'Password',
    //       type: 'password',
    //       alias: 'password',
    //       validators: [
    //         {
    //           key: 'required',
    //           value: true,
    //           customMessage: '',
    //         },
    //         {
    //           key: 'minlength',
    //           value: 5,
    //           customMessage: 'Password should be minimum 5 charecter length',
    //         },
    //       ],
    //       value: '',
    //     },
    //   ];
    // }

    this.formData = [
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
        label: 'User Name',
        type: 'text',
        alias: 'User Name',
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

  isSubmittedForm(event: any) {
    if (event.status && event.status == 'VALID') {
      console.log('sai');

      const payload: any = {
        ...event.value,
      };
      // this.authenticationService.onLogin(payload).subscribe({
      //   next: (res: any) => {
      //     this.isSubmitted = !this.isSubmitted;
      //     console.log('api');
      //     this.goToDashBoard();
      //     this.ionicForm.reset();
      //   },
      //   error: (error: { message: string; status: any }) => {
      //     sentryError(error);
      //     console.log(error);
      //   },
      // });
    }
  }
}
