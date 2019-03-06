import { Post } from './../models/Post';
import Tag from 'src/app/models/Tag';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../services/postService/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  formGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    file: ['', Validators.required]
  });
  tagList: Tag[];
  fileName: string = ' File Name';
  @ViewChild('fileInput') fileInputRef: ElementRef;
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private postService: PostService,
    private router: Router,

  ) {}

  ngOnInit() {}

  getTags(tags: Tag[]) {
    this.tagList = tags;
  }
  clickFileUpload() {
    this.fileInputRef.nativeElement.click();
  }
  getTagsControl(formControl: FormControl) {
    this.formGroup.addControl('tags', formControl);
  }

  onFileSelected(event: any) {
    this.fileName = event.target.files[0].name;
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSubmit() {
    const fg = this.formGroup;
    const timeStamp = new Date().getTime();
    if (fg.valid) {
      const newPost: Post = {
        title: fg.get('title').value,
        text: fg.get('description').value,
        image: fg.get('file').value,
        tags: this.tagList,
        owner: JSON.parse(sessionStorage.getItem('loggedUser')),
        timestamp: timeStamp
      };
      this.postService.postUser(newPost).subscribe(data => {
        this.router.navigate(['/dashboard']);
      })
    } else {
      fg.markAsTouched();
      fg.get('file').markAsTouched();
    }
  }
}
