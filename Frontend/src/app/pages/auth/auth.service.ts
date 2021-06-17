import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserResponse, User } from '../../shared/models/user.interface';
import { environment } from 'src/environments/environment';

import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData:User):Observable<UserResponse | void>{
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
    .pipe(
      map((res: UserResponse)=>{
        console.log('Res =>', res)
        //saveToken()
      }),
      catchError((err)=>this.handlerError(err))
    );
    
  }
  logout():void{}
  private readeToken():void{}
  private saveToken(): void{}
  
  private handlerError(err:any): Observable<never>{
    let errorMesage = "Se produjo un error al recuperar datos";
    if(err){
      errorMesage = `Error: code ${err.mesage}`;
    }
    window.alert(errorMesage);
    return throwError(errorMesage);

  }

}
