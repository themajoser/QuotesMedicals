
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

  returnUrl: string;
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

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  onLogin(): void {

    this.Login.login(this.checkoutForm.get('login').value , this.checkoutForm.get('password').value) .subscribe((data) => {
        this.tokenService.setUserName(data.login);

        this.tokenService.setRole(data.role);
        this.router.navigateByUrl(this.returnUrl);


    },
    error => {

    });
  }

}
