import { TokenService } from './../../Services/Token.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {

  constructor(public tokenService: TokenService) { }
  nombre = this.tokenService.getUserName();
  ngOnInit() {
  }

}
