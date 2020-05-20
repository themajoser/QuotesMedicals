import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const ROLE_KEY = 'AuthRole';
const ID_KEY = 'AuthId';
@Injectable({
  providedIn: 'root'
})
export class TokenService {



  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem("AuthId");
  }
  public setId(id: string): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem("AuthId", id);
  }

  public getId(): string {
    return sessionStorage.getItem("AuthId");
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setRole(role: string): void {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string{
    return sessionStorage.getItem(ROLE_KEY);
  }

  public isAuthorized(code: string):boolean{
    return this.getRole() === code;
  }


  public isUserLoggedIn() {
    const user = sessionStorage.getItem("AuthUserName");
    return user != null;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
