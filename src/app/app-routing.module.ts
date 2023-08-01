import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./folder/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./folder/signup/signup.module').then((m) => m.SignupPageModule),
  },
  // {
  //   path:'dashboard',
  //   loadChildren:()=>
  //       import('')
  // }
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'customer-orders',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer-orders/customer-orders.module').then(
        (m) => m.CustomerOrdersPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
