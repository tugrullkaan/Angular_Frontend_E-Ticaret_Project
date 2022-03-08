import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../login/login';
import { User } from '../login/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  path = environment.API_URL;
  CheckToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer' + localStorage.getItem('Token'),
      }),
    };
    return this.http.get<any>(this.path + '/users/me', httpOptions);
  }
  addUser(usr: User): Observable<any> {
    return this.http
      .post<User>(this.path + '/auth/local/register', usr)
      .pipe(tap((data) => console.log(JSON.stringify(data))));
  }
  login(loginData: Login): Observable<any> {
    return this.http.post<Login>(this.path + '/auth/local', loginData).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = 'Bir Hata Oluştu' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata oluştu';
    }
    return throwError(errorMessage);
  }

  isLoggedIn() {
    if (localStorage.getItem('Token')) {
      return true;
    } else return false;
  }
  logout() {
    localStorage.removeItem('Token');
  }
}
