import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private accessTokenKey:string ='token';
  private nameKey:string = 'name';

  constructor() {
  }

  setAccessToken(token:string){
    localStorage.setItem(this.accessTokenKey, token);

  }
  setName(name:string){
    localStorage.setItem(this.nameKey, name);
  }
  getAccessToken():string{
    return localStorage.getItem(this.accessTokenKey);
  }
  getName():string{
    return localStorage.getItem(this.nameKey);
  }

  public destroy(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.nameKey);
  }
}
