import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/postService/post.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) {}
  userName: string;
  ngOnInit() {
    this.userName = JSON.parse(sessionStorage.getItem('loggedUser')).nickname;
  }

  onSignOff() {
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['/login'])
  }

}
