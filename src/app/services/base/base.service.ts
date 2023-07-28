import { Injectable } from '@angular/core';
import { Firestore, collectionSnapshots } from '@angular/fire/firestore';
import * as FireStore from 'firebase/firestore';
import { ReplaySubject, map } from 'rxjs';

export interface IBaseService<T> {
  getById(itemId: string): Promise<T>;
  getAll(): void;
  add(item: T): Promise<T>;
  addMany(item: T[]): Promise<void>;
  edit(item: T): Promise<T>;
  delete(id: string): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T> implements IBaseService<T> {
  private collection: FireStore.CollectionReference;
  items: ReplaySubject<T[]>;

  constructor(protected path: string, protected afs: Firestore) {
    this.collection = FireStore.collection(this.afs, path);
    this.items = new ReplaySubject<T[]>();    
  }

  getById(itemId: string) {
    return new Promise<T>(async (res, rej) => {
      const doc = FireStore.doc(this.afs, this.path, itemId);

      const docsnap = await FireStore.getDoc(doc);

      const item = docsnap.data();
      item!['id'] = docsnap.id;

      return res(item as T);
    });
  }

  getAll() {
    collectionSnapshots(this.collection)
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const device = a.data() as any;
            device.id = a.id;
            return device;
          });
        })
      )
      .subscribe((devices: T[]) => this.items.next(devices));
  }

  add(item: T) {
    return new Promise<T>((res, rej) => {
      FireStore.addDoc(this.collection, item as any)
        .then((item) => res(item as any))
        .catch((err) => rej(err));
    });
  }

  addMany(items: T[]) {
    return new Promise<void>(async (res, rej) => {
      const batch = FireStore.writeBatch(this.afs);
      let doc;
      items.forEach((item) => {
        doc = FireStore.doc(this.collection);
        batch.set(doc, item as any);
      });
      await batch
        .commit()
        .then(() => res())
        .catch((err) => rej(err));
    });
  }

  edit(item: any) {
    return new Promise<T>((res, rej) => {
      const doc = FireStore.doc(this.afs, this.path, item.id);

      FireStore.updateDoc(doc, { ...item })
        .then((item) => res(item as any))
        .catch((err) => rej(err));
    });
  }

  editMany(items: any[]) {
    return new Promise<void>(async (res, rej) => {
      const batch = FireStore.writeBatch(this.afs);
      let doc;
      items.forEach((item) => {        
        doc = FireStore.doc(this.afs, this.path, item.id);
        batch.update(doc, { ...item });
      });
      await batch
        .commit()
        .then(res)
        .catch((err) => rej(err));
    });
  }

  delete(itemId: string) {
    return new Promise<void>(async (res, rej) => {
      FireStore.deleteDoc(FireStore.doc(this.afs, this.path, itemId))
        .then(res)
        .catch((err) => rej(err));
    });
  }
}
