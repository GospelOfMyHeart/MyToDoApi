import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthService {

  private token: string = 'Token';
  private name: string = 'Name';

  constructor(
    private session: SessionService,
  ) {
  }

  public isSignedIn() {
    return !!this.session.getAccessToken();
  }

  public doSignOut() {
    this.session.destroy();
  }

  public doSignIn(accessToken: string, name: string) {
    if ((!accessToken) || (!name)) {
      return;
    }
    this.session.setAccessToken( accessToken);
    this.session.setName(name);

  }

}
