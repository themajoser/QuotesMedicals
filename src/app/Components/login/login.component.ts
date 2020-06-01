
import { TokenService } from './../../Services/Token.service';
import { LoginService } from '../../Services/Login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';
  checkoutForm: FormGroup;
  formValido;


  constructor(private Login: LoginService,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
    ) {

     }

  ngOnInit() {
    this.checkoutForm   = this.fb.group({
      login:  [, [Validators.required]],
      password:   [, [Validators.required]]
    });
    this.formValido=true;
  }
  get formulario() {
    return this.checkoutForm.controls;
  }

  onLogin(): void {
    if (this.checkoutForm.valid) {
    this.Login.login(this.checkoutForm.get('login').value , this.checkoutForm.get('password').value).subscribe(
      (data) => {
      this.tokenService.setUserName(data.login);
      this.tokenService.setId(String(data.id));
      this.tokenService.setRole(data.role);
      this.router.navigateByUrl("home");




    },
    errorResponse => {
      // Login Error
     this.formValido=errorResponse;
    this.formValido=false;

  });
}
  }
}


