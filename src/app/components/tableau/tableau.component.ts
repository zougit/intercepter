import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faCheckDouble,
  faTrash,
  faEdit,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { DialogDetailComponent } from '../dialog-detail/dialog-detail.component';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'],
})
export class TableauComponent implements OnInit, OnChanges {
  @Input() thead!: any;
  @Input() content!: any;
  @Input() page!: string;
  @Input() service!: any;
  @Input() function!: any;
  @Output() boxCheckEmitter = new EventEmitter<any[]>();
  boxCheck: any[] = [];

  user!: User;

  itemsPerPage = 18;
  p = 1;

  tbody: any[][] = [[{ id: '' }]];

  Array = Array;

  doublecheck = faCheckDouble;
  edit = faEdit;
  trash = faTrash;
  info = faCircleInfo;

  toggle = false;
  toggle2 = false;

  isChecked: any[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : '';
  }

  ngOnChanges() {
    let row = [];
    this.tbody = [];
    if (this.content) {
      // console.log('content: ', this.content);

      for (const body of this.content) {
        row = [];
        for (const th of this.thead) {
          for (const [key, value] of Object.entries(body)) {
            if (th.name === key) {
              if (value === '' && this.page == 'users') {
                row.push('_');
              } else {
                row.push(value);
              }
            }
          }
          if (th.name === '') {
            row.push('');
          }
        }
        this.tbody.push(row);
        if (this.isChecked.length < this.content.length) {
          this.isChecked.push({ value: false });
        }
      }
    }
    // console.log(this.isChecked);
    // console.log(this.isChecked.filter((x) => x.value == true));

    // console.log('body:',this.tbody);
  }

  slide() {
    this.toggle = !this.toggle;
  }

  checkAll() {
    this.toggle2 = !this.toggle2;

    if (this.toggle2) {
      for (const device of this.content) {
        this.boxCheck.push(device.id);
      }
    }
    this.boxCheckEmitter.emit(this.boxCheck);
  }

  addChecked(elmt: string, event: any) {
    // console.log('elmt', elmt);
    // console.log('event', event.target.checked);
    const i = this.content.findIndex((item: any) => item.id == elmt);
    console.log(i);

    if (event.target.checked) {
      this.boxCheck.push(elmt);
      this.isChecked[i].value = true;
      console.log(
        'list : ',
        this.isChecked.filter((x) => x.value == true)
      );
    } else {
      const index = this.boxCheck.indexOf(elmt);
      if (index !== -1) {
        this.boxCheck.splice(index, 1);
        this.isChecked[i].value = false;
      }
      console.log(
        'list slice: ',
        this.isChecked.filter((x) => x.value == true)
      );
    }
    this.boxCheckEmitter.emit(this.boxCheck);
  }

  hasProp(o: Object, name: string) {
    // return o.hasOwnProperty(name);
    if (o) {
      return o.hasOwnProperty(name);
    } else {
      return false;
    }
  }

  isTableEmpty() {
    if (this.thead && this.thead.length != 0) {
      if (this.tbody && this.tbody.length != 0 && this.tbody[0].length != 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  canDelete(item: any) {
    if (this.hasProp(item, 'canDel')) {
      return item.canDel;
    } else {
      return this.function(item);
    }
    // return this.function(item);
  }

  openDetails(id: string) {
    const item = this.content.find((i: any) => i.id === id);

    const dialogRef = this.dialog.open(DialogDetailComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onClickDelete(id: string) {
    this.service.delete(id);
  }
}
