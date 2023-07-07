import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  public appPages = [
    { title: 'Profile', url: '/dashboard/Profile', icon: 'person' },
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Modules', url: '/dashboard/Modules', icon: 'book' },
    { title: 'Quizzes', url: '/dashboard/Quizzes', icon: 'document-text' },
    { title: 'Grades', url: '/dashboard/Grades', icon: 'ribbon' },
    { title: 'Help', url: '/dashboard/Help', icon: 'help' },
    { title: 'Logout', url: '/login', icon: 'log-out' },
  ];
  constructor(private router: Router) {}
  urllist = ['', '/login', '/signup'];
  currentUrl = false;
  currentModuleUrl: any = '';
  ngOnInit(): void {}
  currentRoute = this.appPages[0].url;
  clickNav(route: string) {
    this.currentRoute = route;
    console.log(this.currentRoute);
  }
  ngAfterViewChecked() {
    setTimeout(() => {
      this.currentRoute = this.router.url;

      this.currentModuleUrl = this.router.url;

      !this.urllist.find((x) => x == this.router.url)
        ? (this.currentUrl = true)
        : (this.currentUrl = false);
    });
  }
}
