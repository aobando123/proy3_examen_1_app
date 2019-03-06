import { AuthGuardService } from './auth-guard.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";
import {
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatOptionModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { TypeaheadComponent } from './shared/typeahead/typeahead.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './shared/menu/menu.component';
import { PostComponent } from './shared/post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentComponent } from './shared/comment/comment.component';
import { LikedPostComponent } from './liked-post/liked-post.component';
import { PreferencePostComponent } from './preference-post/preference-post.component';
import { MyPostComponent } from './my-post/my-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TypeaheadComponent,
    DashboardComponent,
    MenuComponent,
    PostComponent,
    CreatePostComponent,
    PostDetailComponent,
    CommentComponent,
    LikedPostComponent,
    PreferencePostComponent,
    MyPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
