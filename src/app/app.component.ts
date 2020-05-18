import { TokenService } from './Services/Token.service';
import { LoginService } from './Services/Login.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuotesMedicals';

  constructor(private Login: LoginService, public tokenService: TokenService) { }
}
