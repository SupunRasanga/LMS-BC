import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  login(){

    if(this.email == ''){
      alert('Please enter email');
      return;
  }
    if(this.password == ''){
      alert('Please enter Password');
    }

    // this.auth.login(this.email, this.password);
    localStorage.setItem('userEmail', this.email);
    this.router.navigate(['/dashboard']);

    this.email = '';
    this.password = '';
  }
}
