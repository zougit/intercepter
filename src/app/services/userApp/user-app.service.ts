import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { UserApp } from 'src/app/models/userApp.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserAppService extends BaseService<UserApp> {

  constructor(afs: Firestore) {
    const path = 'userApp';
    super(path, afs);
  }
}
