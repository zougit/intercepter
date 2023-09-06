import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { signOut } from 'firebase/auth';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'intercepter-angular';

  isLogged = false;
  loginSub!: Subscription;

  selectedLang!: any;

  user!: User;
  userLang!: Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>;

  currentTime = Date.now();
  public languagesList!: Array<
    Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>
  >;

  constructor(
    private authService: AuthService,
    private readonly translocoService: TranslocoService,
    private readonly afa: Auth,
    private router: Router
  ) {}

  ngOnInit() {

    this.loginSub = this.authService.isLoggedIn().subscribe((res) => {
      this.isLogged = res;

      this.languagesList = [
        {
          imgUrl: './assets/img/en.png',
          code: 'en',
          name: 'English',
          shorthand: 'ENG',
        },
        {
          imgUrl: './assets/img/fr.png',
          code: 'fr',
          name: 'Français',
          shorthand: 'FR',
        },
      ];

      if (res) {
        // console.log(this.languagesList);
        this.user = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')!)
          : '';

        if (this.user) {
          // console.log(this.user);
          this.userLang =
            this.user.region.split('/')[0] == 'Europe'
              ? this.languagesList[1]
              : this.languagesList[0];

          if (this.userLang) {
            this.translocoService.setActiveLang(this.userLang.code);
            this.languagesList = this.languagesList.filter(
              (x) => x != this.userLang
            );
          }
        }
      }
    });
  }

  public logout() {
    signOut(this.afa).then(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }

  public changeLanguage(languageCode: any): void {
    if (languageCode) {
      this.translocoService.setActiveLang(languageCode);
    }
  }
}
