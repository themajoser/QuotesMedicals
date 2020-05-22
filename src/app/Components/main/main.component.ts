import { LoginService } from './../../Services/Login.service';
import { TokenService } from './../../Services/Token.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private Login: LoginService, public tokenService: TokenService) { }

  ngOnInit() {
  }

}
