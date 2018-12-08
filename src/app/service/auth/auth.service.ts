import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private authenticated = false;
  authStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  logIn() {
    this.authenticated = true;
    this.authStateChanged.next(this.authenticated);
  }

  getAuthState() {
    return this.authenticated;
  }

  logOut() {
    this.authenticated = false;
    this.authStateChanged.next(this.authenticated);
  }

  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.authenticated);
        }, 500);
      }
    );
  }

}
