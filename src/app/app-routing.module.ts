import { AuthGuardService as AuthGuard  } from './auth-guard.module';
import { MyPostComponent } from './my-post/my-post.component';
import { PreferencePostComponent } from './preference-post/preference-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate  } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { LikedPostComponent } from './liked-post/liked-post.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreatePostComponent
  },
  {
    path: 'dashboard/post/:id',
    canActivate: [AuthGuard],
    component: PostDetailComponent
  },
  {
    path: 'dashboard/liked',
    canActivate: [AuthGuard],
    component: LikedPostComponent
  },
  {
    path: 'dashboard/preference',
    canActivate: [AuthGuard],
    component: PreferencePostComponent
  },
  {
    path: 'dashboard/mypost',
    canActivate: [AuthGuard],
    component: MyPostComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
