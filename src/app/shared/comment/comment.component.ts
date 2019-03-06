import User from 'src/app/models/User';
import { FormControl, Validators } from '@angular/forms';
import { Comment } from './../../models/Comment';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { CommentService } from 'src/app/services/commentService/comment.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  parsedDate: string;
  commentEdit = new FormControl('', Validators.required);
  isEditable = false;
  editMode = false;
  user: User;
  constructor(private commentService: CommentService) {
    this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
  }

  ngOnInit() {
    this.parsedDate = moment(this.comment.timestamp).format('DD-MM-YYYY');
    this.isEditable = this.user.id === this.comment.user.id;
  }
  activateEdit() {
    this.commentEdit.patchValue(this.comment.comment);
    this.editMode = true;
    this.isEditable = false;
  }

  saveEdit() {
    if(this.commentEdit.valid) {
      const newComment = this.commentEdit.value;
      this.comment.comment =  newComment;
      this.commentService.updateComment(this.comment).subscribe();
      this.editMode = false;
      this.isEditable = true;
    }

  }

}
