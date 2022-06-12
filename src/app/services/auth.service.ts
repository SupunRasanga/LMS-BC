import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
     // localStorage.setItem('token','true');
     localStorage.setItem('userEmail', email);
      this.router.navigate(['/']);
    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
      })
    }

    // register method
    register(email: string, password: string){
      this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
        this.router.navigate(['/login']);
        alert('Registration Successful');
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }

    //sign out
    logout(){
      this.fireauth.signOut().then( () => {
        //localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        this.router.navigate(['/login']);
        alert('User Logout');
      }, err => {
        alert(err.message);
      })
    }
}
