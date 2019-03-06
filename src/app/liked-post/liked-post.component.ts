import { Post } from 'src/app/models/Post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/postService/post.service';

@Component({
  selector: 'app-liked-post',
  templateUrl: './liked-post.component.html',
  styleUrls: ['./liked-post.component.scss']
})
export class LikedPostComponent implements OnInit {
  postList:Post[] = []
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const userId = JSON.parse(sessionStorage.getItem('loggedUser')).id;
    this.postService.getlikedPost(userId).subscribe(data => {
      this.postList = data;
    })
  }
}
