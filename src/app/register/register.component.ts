import Tag from 'src/app/models/Tag';
import User from 'src/app/models/User';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { UserService } from '../services/userService/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  nicknameControl = new FormControl('', [Validators.required]);
  preferences: FormControl;
  tagList: Tag[];
  getTags(tags: Tag[]) {
    this.tagList = tags;
  }
  getValidator(formControl: FormControl) {
    this.preferences = formControl;
  }

  ngOnInit() {}

  register() {
    if (this.nicknameControl.valid && this.preferences.valid) {
      const newUser: User = {
        nickname: this.nicknameControl.value,
        preferences: this.tagList
      };
      this.userService.postUser(newUser).subscribe(data => {
        if (data) {
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar('user is already registered', 'close');
        }
      });
    }
    this.nicknameControl.markAsTouched();
    this.preferences.markAsTouched();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
}
