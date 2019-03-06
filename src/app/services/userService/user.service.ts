import apiUrl from 'src/app/utils/apiInfo';
import User from 'src/app/models/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(nickname: string): Observable<User> {
    const url = apiUrl + `/user/nickname/${nickname}`;
    return this.http.get<User>(url);
  }

  postUser(user: User) : Observable<User> {
    const url = apiUrl + '/user';
    return this.http.post<User>(url, user);
  }
}
