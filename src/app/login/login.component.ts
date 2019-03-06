import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../services/userService/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  nicknameControl = new FormControl('', [Validators.required]);

  onLogin() {
    if (this.nicknameControl.valid) {
      const nickname = this.nicknameControl.value;
      this.userService.getUser(nickname).subscribe(
        data => {
          if (data !== null) {
            sessionStorage.setItem('loggedUser', JSON.stringify(data));
            this.router.navigate(['/dashboard']);
          } else {
            this.openSnackBar('No user where found', 'close');
          }
        },
        () => {
          this.openSnackBar('Something went wrong', 'close');
        }
      );
    }
    this.nicknameControl.markAsTouched();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000
    });
  }
  ngOnInit() {}
}
