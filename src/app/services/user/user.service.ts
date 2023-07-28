import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor(afs: Firestore) {
    const path = 'users';
    super(path, afs);
  }
}
