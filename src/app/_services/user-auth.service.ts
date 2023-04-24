import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {
  }

  public setRoles(roles: []) {
    // localStorage.setItem("roles", JSON.stringify(roles));
    localStorage.setItem("roles", JSON.stringify(roles))
  }

  public getRoles(): [] {
    // return JSON.parse(localStorage.getItem("roles"));
    return JSON.parse(localStorage.getItem("roles") || "{}");
  }

  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem("jwtToken") || "{}";
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    const roles = this.getRoles();
    const token = this.getToken();
    return roles.length > 0 && token.length > 0;
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === "Admin";
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === "User";
  }
}
