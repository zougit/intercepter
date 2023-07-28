import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Customer } from 'src/app/models/customer.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer>{
  constructor(afs: Firestore) {
    const path = 'customers';
    super(path,afs);    
  }
}
