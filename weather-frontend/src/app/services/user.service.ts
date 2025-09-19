import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  public createUser(user: User): Observable<User> {
    return this.httpClient.post(`${environment.API_URL}/api/User`, user).pipe(
      catchError(error => {
        console.error(error);
        return of({} as User);
      })
    );
  }

  public signIn(username: string, password: string): Observable<User> {
    return this.httpClient.post(`${environment.API_URL}/api/login`, { Username: username, Password: password }).pipe(
      map((userInfos: User) => {
        localStorage.setItem('user', JSON.stringify(userInfos));
        return userInfos;
      }),
      catchError(error => {
        console.error(error);
        return of({} as User);
      })
    );
  }

  public signOut(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
