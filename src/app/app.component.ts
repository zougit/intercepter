import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intercepter-angular';
  currentTime = Date.now()
  public languagesList: Array<Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>> = [
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

  constructor(private readonly translocoService: TranslocoService) {}  

  ngOnInit() {
  }

  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);

  }
}
