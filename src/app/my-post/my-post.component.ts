import { Post } from 'src/app/models/Post';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/postService/post.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {

  postList:Post[] = []
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const userId = JSON.parse(sessionStorage.getItem('loggedUser')).id;
    this.postService.getOwnerPost(userId).subscribe(data => {
      this.postList = data;
    })
  }
}
