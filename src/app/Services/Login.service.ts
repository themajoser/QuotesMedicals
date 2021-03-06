import { catchError } from 'rxjs/operators';

import { Injectable, ɵConsole, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { JwtModel } from '../Interfaces/JwtModel';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginO: JwtModel={
    id : undefined,
    role : undefined,
    login : undefined,
    password : undefined
  }

  private authURL = 'http://localhost:8080/login/';
  cabecera = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                              'accept-language': 'en-US,en;q=0.8'
                             })
  };


  constructor(private httpClient: HttpClient) { }

  public login(usuario: string, password: string): Observable<JwtModel> {
    let url = this.authURL;
    this.loginO.login = usuario;
    this.loginO.password = password;
    return this.httpClient.post<JwtModel>(url , this.loginO, this.cabecera).pipe(
      catchError(e => {
          return throwError(e);
      })
    );
  }

}
