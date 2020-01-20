import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginCheckGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private location: Location
  ){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.auth.isSignedIn()){
      this.location.back();
      return false;
    } else{
      return true;
    }
  }

}
