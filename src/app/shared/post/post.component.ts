import { PostService } from './../../services/postService/post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import * as moment from 'moment';
import User from 'src/app/models/User';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input()
  post: Post;
  date: string;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.date = moment(this.post.timestamp).format('DD/MM/YYYY');
  }
}
