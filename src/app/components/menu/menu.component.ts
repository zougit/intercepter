import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public isBtnActive = Number(sessionStorage.getItem('isBtnActive')) || 1;

  user!: User;

  ngOnInit() {
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : '';

    if (this.user.role == 'user') {
      this.isBtnActive = 8;
    }
  }

  toggleBtn(id: any) {
    this.isBtnActive = id;
    sessionStorage.setItem('isBtnActive', id);
  }
}
