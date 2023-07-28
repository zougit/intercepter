import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Zone } from 'src/app/models/zone.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseService<Zone>{
  constructor(afs: Firestore) {
    const path = 'zones';
    super(path,afs);    
  }
}
