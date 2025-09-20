import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}/api/User`).pipe(
      catchError(error => {
        console.error(error)
        return of({} as User[])
      })
    )
  } 


  public createUser(user: User): Observable<User> {
    return this.httpClient.post(`${environment.API_URL}/api/User`, user).pipe(
      catchError(error => {
        console.error(error);
        return of({} as User);
      })
    );
  }

  public signIn(username: string, password: string): Observable<{ user: User; token: string }> {
    return this.httpClient
      .post<{ user: User; token: string }>(`${environment.API_URL}/api/Login`, {
        Username: username,
        Password: password
      })
      .pipe(
        map(userInfo => {
          localStorage.setItem('user', JSON.stringify(userInfo.user));
          localStorage.setItem('token', userInfo.token);
          return userInfo;
        }),
        catchError(error => {
          console.error(error);
          return of({} as { user: User; token: string });
        })
      );
  }

  public signOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
