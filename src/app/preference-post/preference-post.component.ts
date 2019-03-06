import { Post } from 'src/app/models/Post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/postService/post.service';

@Component({
  selector: 'app-preference-post',
  templateUrl: './preference-post.component.html',
  styleUrls: ['./preference-post.component.scss']
})
export class PreferencePostComponent implements OnInit {
  postList:Post[] = []
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const userId = JSON.parse(sessionStorage.getItem('loggedUser')).id;
    this.postService.getPreferencePost(userId).subscribe(data => {
      this.postList = data;
    })
  }
}
