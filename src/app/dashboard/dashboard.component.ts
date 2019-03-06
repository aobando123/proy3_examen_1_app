import { PostService } from './../services/postService/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../models/Post';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  postList:Post[] = []
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    this.postService.getAllPost().subscribe(data => {
      this.postList = data;
    })
  }
  updatePostList(event:Post[]) {
    this.postList = event;
  }

}
