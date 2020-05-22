
import { TokenService } from './../../Services/Token.service';
import { LoginService } from '../../Services/Login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  title = 'login';

  checkoutForm;

  constructor(private Login: LoginService,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
    ) {
      this.checkoutForm   = new FormGroup({
        login:  new FormControl(''),
        password:  new FormControl(''),
      });
     }

  ngOnInit() {


  }

  onLogin(): void {

    this.Login.login(this.checkoutForm.get('login').value , this.checkoutForm.get('password').value) .subscribe((data) => {

      this.tokenService.setUserName(data.login);
      this.tokenService.setId(String(data.id));
      this.tokenService.setRole(data.role);
      this.router.navigate(["/home"]);




    });

  }
  }


