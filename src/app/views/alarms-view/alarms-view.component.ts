import { Component } from '@angular/core';

@Component({
  selector: 'app-alarms-view',
  templateUrl: './alarms-view.component.html',
  styleUrls: ['./alarms-view.component.scss']
})
export class AlarmsViewComponent {
  thead = ["custom","zone","typeDevice","deveui","alarm"];
  tbody = [["Groupe Gabriel","Porsche Prestige","	ACS-SWITCH","70B3D56371D4CA78","01/06/2023 00:06:32"],["Groupe Gabriel","Porsche Prestige","	ACS-SWITCH","70B3D56371D4CA78","01/06/2023 00:06:32"],["Groupe Gabriel","Porsche Prestige","	ACS-SWITCH","70B3D56371D4CA78","01/06/2023 00:06:32"]];
}
