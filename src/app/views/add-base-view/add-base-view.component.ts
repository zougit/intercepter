import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/models/device.model';

@Component({
  selector: 'app-add-base-view',
  templateUrl: './add-base-view.component.html',
  styleUrls: ['./add-base-view.component.scss'],
})
export class AddBaseViewComponent {
  page!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.page = this.route.snapshot.params['page'];

    console.log(this.page);
  }
}
