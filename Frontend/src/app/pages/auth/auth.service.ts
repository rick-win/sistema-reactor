import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserResponse, User } from '../../shared/models/user.interface';
import { environment } from 'src/environments/environment';

import {catchError, map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    this.checkToken() ;
   }

  login(authData:User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((res: UserResponse)=>{
        this.saveToken(res.token);
      }),
      catchError((err)=>this.handlerError(err))
    );
    
  }
  logout():void{
    localStorage.removeItem('token');
    //set userIslogged = false
  }
  private checkToken():void{
    const userToken: string | any = localStorage.getItem('token') ;
       
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired =>', isExpired);
    // set userIslogged = isExpired

  }
  private saveToken(token: string): void{
    localStorage.setItem('token', token);
  }
  
  private handlerError(err:any): Observable<never>{
    let errorMesage = "Se produjo un error al recuperar datos";
    if(err){
      errorMesage = `Error: code ${err.mesage}`;
    }
    window.alert(errorMesage);
    return throwError(errorMesage);

  }

}
