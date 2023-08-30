import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Firestore } from '@angular/fire/firestore';
import * as FireStore from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
      console.log('user :', user.id, ' :', user.username);

      if (user) {
        const email = user.username + '@intercepter.com';
        if (user.password == userLog.password) {
          signInWithEmailAndPassword(this.afa, email, user.password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log('user connected');
              res;
            })
            .catch((err) => {
              if (err.code == 'auth/user-not-found') {
                createUserWithEmailAndPassword(
                  this.afa,
                  email,
                  user.password
                ).then((userCredential) => {
                  const user = userCredential.user;
                  console.log('user created');
                  res;
                });
              }
            });
        } else {
          alert('mauvais mdp');
          rej;
        }
      } else {
        alert('mauvais username');
        rej;
      }
    });
  }
}
