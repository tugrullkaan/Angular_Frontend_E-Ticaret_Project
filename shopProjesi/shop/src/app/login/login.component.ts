import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AlertifyService } from '../services/alertify.service';
import { Login } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: Login = new Login();
  constructor(
    private accountService: AccountService,
    private router: Router,
    private myAlertifyService: AlertifyService
  ) {}

  ngOnInit(): void {}
  login() {
    this.accountService.login(this.loginData).subscribe((data) => {
      this.myAlertifyService.success('başarıyla giriş gerçekleşti.');
      localStorage.setItem('Token', data.jwt);
    });

    this.router.navigate(['products']);
  }
}
