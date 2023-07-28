import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import * as FireStore from 'firebase/firestore';
import { Device } from 'src/app/models/device.model';
import { BaseService } from '../base/base.service';
import { ref, deleteObject } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends BaseService<Device> {
  constructor(afs: Firestore, private afStorage: Storage) {
    const path = 'devices';
    super(path, afs);
  }

  override delete(itemId: string): Promise<void> {
    return new Promise<void>(async (res, rej) => {
      const doc = FireStore.doc(this.afs, 'devices', itemId);
      const docsnap = await FireStore.getDoc(doc);
      let imgPath = docsnap.get('imgPath');
      let imgPathSplit;
      let img;
      if (imgPath) {
        imgPathSplit = imgPath.split('/');
        img = ref(
          this.afStorage,
          imgPathSplit[imgPathSplit.length - 1]!.split('?')[0]
        );
        deleteObject(img);
      }

      FireStore.deleteDoc(FireStore.doc(this.afs, this.path, itemId))
        .then(res)
        .catch((err) => rej(err));
    });
  }
}
