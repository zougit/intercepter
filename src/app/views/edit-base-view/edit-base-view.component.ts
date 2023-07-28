import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-base-view',
  templateUrl: './edit-base-view.component.html',
  styleUrls: ['./edit-base-view.component.scss']
})
export class EditBaseViewComponent {
  page!: string;
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.page = this.route.snapshot.params['page'];
    this.id = this.route.snapshot.params['id'];

    // console.log(this.page);
    // console.log(this.id);
  }
}
