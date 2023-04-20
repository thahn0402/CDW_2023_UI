import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:9090";

  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  });

  constructor(private httpclient: HttpClient,
              private userAuthService: UserAuthService) {
  }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate", loginData, {headers: this.requestHeader})
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.userAuthService.getRoles();

    if (!userRoles) {
      return false;
    }

    for (let i = 0; i < userRoles.length; i++) {
      if (allowedRoles.includes(userRoles[i].roleName)) {
        return true;
      }
    }

    return false;
  }

}
