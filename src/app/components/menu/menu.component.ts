import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public isBtnActive = Number(localStorage.getItem("isBtnActive")) || 1;

  ngOnInit() {
    
  }

  toggleBtn(id: any) {
    this.isBtnActive = id
    localStorage.setItem("isBtnActive",id)
  }
}
