import apiUrl from 'src/app/utils/apiInfo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/Comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  updateComment(comment: Comment): Observable<Comment> {
    const url = apiUrl + `/comment`;
    return this.http.put<Comment>(url, comment);
  }
}
