import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import * as FireStore from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(true);

  constructor(private afa: Auth, private afs: Firestore) {}

  login(userLog: any) {
    return new Promise<void>(async (res, rej) => {
      const doc = FireStore.query(
        FireStore.collection(this.afs, 'users'),
        FireStore.where('username', '==', userLog.username)
      );

      const docsnap = await FireStore.getDocs(doc);
      let user: any;
      docsnap.forEach((doc) => {
        user = doc.data();
        user.id = doc.id;
        return user;
      });

      if (user) {
        const email = user.username + '@intercepter.com';
        if (user.password == userLog.password) {
          signInWithEmailAndPassword(this.afa, email, user.password)
            .then(() => {
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.removeItem('isBtnActive');
              this._isLoggedIn.next(true);
              res();
            })
            .catch((err) => {
              if (err.code == 'auth/user-not-found') {
                createUserWithEmailAndPassword(
                  this.afa,
                  email,
                  user.password
                ).then(() => {
                  localStorage.setItem('user', JSON.stringify(user));
                  localStorage.removeItem('isBtnActive');
                  this._isLoggedIn.next(true);
                  res();
                });
              }
            });
        } else {
          alert('mauvais mdp');
          rej();
        }
      } else {
        alert('mauvais username');
        rej();
      }
    });
  }

  public isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }

  public logout() {
    this._isLoggedIn.next(false);
  }
}
