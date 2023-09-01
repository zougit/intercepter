import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { signOut } from 'firebase/auth';
import { User } from './models/user.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  //TODO - Propagation info user + role/droits
  //TODO - gerer droit de suppression 
  title = 'intercepter-angular';

  isLogged = false;
  user!: User;
  userLang!: Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>;

  currentTime = Date.now();
  public languagesList: Array<
    Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>
  > = [
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

  constructor(
    private authService: AuthService,
    private readonly translocoService: TranslocoService,
    private readonly afa: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((res) => {
      this.isLogged = res;
      this.user = JSON.parse(localStorage.getItem('user') ?? "");
      if (this.user) {
        this.userLang =
          this.user.region.split('/')[0] == 'Europe'
            ? this.languagesList[1]
            : this.languagesList[0];

        this.translocoService.setActiveLang(this.userLang.code);

        this.languagesList = this.languagesList.filter(
          (x) => x != this.userLang
        );
      }
    });
  }

  public logout() {
    signOut(this.afa).then(() => {
      localStorage.clear();
      this.authService.logout();
      this.router.navigate(['login']);
    });
  }

  public changeLanguage(languageCode: string): void {
    if (languageCode) {
      this.translocoService.setActiveLang(languageCode);
    }
  }
}
