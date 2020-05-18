import { TokenService } from './../../Services/Token.service';
import { LoginService } from './../../Services/Login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private Login: LoginService, public tokenService: TokenService) { }

  ngOnInit() {
  }

}
