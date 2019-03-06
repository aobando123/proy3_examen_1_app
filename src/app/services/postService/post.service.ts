import User from 'src/app/models/User';
import Tag from 'src/app/models/Tag';
import { Post } from './../../models/Post';
import apiUrl from 'src/app/utils/apiInfo';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from 'src/app/models/Comment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}
  postUser(post: Post): Observable<Post> {
    const url = apiUrl + '/post';
    return this.http.post<Post>(url, post);
  }

  getAllPost(): Observable<Post[]> {
    const url = apiUrl + '/post';
    return this.http.get<Post[]>(url);
  }
  getPreferencePost(id: number): Observable<Post[]> {
    const url = apiUrl + `/post/preference/${id}`;
    return this.http.get<Post[]>(url);
  }
  getOwnerPost(id: number): Observable<Post[]> {
    const url = apiUrl + `/post/user/${id}`;
    return this.http.get<Post[]>(url);
  }
  getlikedPost(id: number): Observable<Post[]> {
    const url = apiUrl + `/post/liked/${id}`;
    return this.http.get<Post[]>(url);
  }
  updateLikes(id: number, users: User[]): Observable<Post> {
    const url = apiUrl + `/post/like/${id}`;
    return this.http.put<Post>(url, users);
  }
  addComment(id: number, comments: Comment): Observable<Post> {
    const url = apiUrl + `/post/comment/${id}`;
    return this.http.post<Post>(url, comments);
  }
  updateComment(id: number, comments: Comment[]): Observable<Post> {
    const url = apiUrl + `/post/comment/${id}`;
    return this.http.put<Post>(url, comments);
  }
  getPost(id: number): Observable<Post> {
    const url = apiUrl + `/post/${id}`;
    return this.http.get<Post>(url);
  }
}
