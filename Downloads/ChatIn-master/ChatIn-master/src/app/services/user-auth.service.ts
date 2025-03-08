import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}
  public isLogin: boolean = false;

  setFlag(value: boolean) {
    this.isLogin = value;
  }

  getFlag(): boolean {
    return this.isLogin;
  }
}
