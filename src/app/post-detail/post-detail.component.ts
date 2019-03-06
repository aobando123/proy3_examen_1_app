import { Comment } from './../models/Comment';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/postService/post.service';
import { Post } from '../models/Post';
import * as moment from 'moment';
import User from '../models/User';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.user =  JSON.parse(sessionStorage.getItem('loggedUser'));
  }
  id: number;
  post: Post;
  postDate: string;
  user: User;
  isPostLiked = false;
  commentBox = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.loadPost();
  }
  loadPost() {
    this.postService.getPost(this.id).subscribe(data => {
      this.post = data;
      console.log(data)
      this.postDate = moment(data.timestamp).format('DD-MM-YYYY');
      this.isPostLike();
    })
  }

  private isPostLike() {
    const foundUser = this.post.likes.find(user => user.id === this.user.id);
    this.isPostLiked = !!foundUser;
  }

  onLikeClick() {
    this.isPostLiked ? this.removeUserToLikes() : this.addUsertoLikes();
    const {id, likes} = this.post;
    this.postService.updateLikes(id, likes).subscribe(data => {
    });
  }
  addUsertoLikes() {
    this.post.likes.push(this.user);
    this.isPostLiked = true;
  }
  removeUserToLikes() {
    this.post.likes = this.post.likes.filter(user => user.id !== this.user.id)
    this.isPostLiked = false;
  }
  onClickComment() {
    if(this.commentBox.valid) {
      const comment:Comment =  {
        comment: this.commentBox.value,
        timestamp: new Date().getTime(),
        user: this.user
      }
      this.postService.addComment(this.post.id, comment).subscribe(data => {
        this.commentBox.reset();
        this.post.comments = data.comments.reverse();
      });
    }
  }

}
