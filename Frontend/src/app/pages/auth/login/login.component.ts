import { Component, OnInit } from '@angular/core';
import{FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });
  constructor(
    private authSvc: AuthService, 
    private fb:FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
   /* const userData = {
      username: 'davidIdrobo',
      password: '2345678',
    };
    this.authSvc.login(userData).subscribe((user) => console.log('Login'))*/
  }

  onLogin():void{
    const formvalue = this.loginForm.value;
    this.authSvc.login(formvalue).subscribe( res=>{
      if(res){
        this.router.navigate(['']);
      }
    })
  }
}
