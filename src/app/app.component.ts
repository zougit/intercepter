import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'intercepter-angular';

  isLogged = false;

  currentTime = Date.now();
  public languagesList: Array<
    Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>
  > = [
    {
      imgUrl: '/assets/img/en.png',
      code: 'en',
      name: 'English',
      shorthand: 'ENG',
    },
    {
      imgUrl: '/assets/img/fr.png',
      code: 'fr',
      name: 'Français',
      shorthand: 'FR',
    },
  ];

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly afa: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn().then((res) => {
      console.log(res);
      this.isLogged = res;
    });
  }

  public logout() {
    signOut(this.afa).then(() => {
      this.isLogged = false;
      this.router.navigate(['login']);
    });
  }

  public isLoggedIn(): Promise<boolean> {
    return new Promise((resolve: any) => {
      onAuthStateChanged(this.afa, (user: any) => {
        user ? resolve(true) : resolve(false);
      });
    });
  }

  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
  }
}
