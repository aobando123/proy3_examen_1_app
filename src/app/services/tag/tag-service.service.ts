import Tag from 'src/app/models/Tag';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import apiUrl from 'src/app/utils/apiInfo';
@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    const url = apiUrl + '/tag';
    return this.http.get<Tag[]>(url);
  }
}
