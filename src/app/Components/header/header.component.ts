import { TokenService } from './../../Services/Token.service';
import { LoginService } from './../../Services/Login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private Login: LoginService, public tokenService: TokenService) { }
          nombre = this.tokenService.getUserName();
  ngOnInit() {
    // $('a#exit.btn.btn-primary.btn-danger.text-white').click(function(){
    //   $('div.modal-backdrop.fade.show').removeClass('modal-backdrop fade show')
    // });
  }

}
