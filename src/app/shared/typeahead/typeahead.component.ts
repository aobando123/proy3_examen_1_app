import { TagService } from './../../services/tag/tag-service.service';
import { Component, OnInit, Output, Input } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete
} from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Tag from 'src/app/models/Tag';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @Output() tagsChanged: EventEmitter<Tag[]> = new EventEmitter();
  @Output() validation: EventEmitter<FormControl> = new EventEmitter();
  tagCtrl: FormControl;
  inputCtrl = new FormControl();

  constructor(private tagService: TagService) {}

  ngOnInit() {
    this.tagCtrl = new FormControl('', this.Validatetags);
    this.tagsChanged.emit(this.tags);
    this.validation.emit(this.tagCtrl);
    this.loadTags();
  }
  loadTags() {

    this.tagService.getTags().subscribe(data => {
      this.allTags = data;
      this.updateFilterList();
    });
  }

  Validatetags = () => {
    const isNotValid = this.tags.length === 0;
    if (isNotValid) return { emptyTags: isNotValid };
    return null;
  };
  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value || '';

      if (value.trim() && !this.isAlreadyOnList(value)) {
        this.tags.push({ name: value.trim() });
        this.tagsChanged.emit(this.tags);
        this.validation.emit(this.tagCtrl);
      }

      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.tagsChanged.emit(this.tags);
      this.validation.emit(this.tagCtrl);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!this.isAlreadyOnList(value.name)) {
      this.tags.push(value);
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
      this.tagsChanged.emit(this.tags);
      this.validation.emit(this.tagCtrl);
      this.updateFilterList();
    }
  }

  private isAlreadyOnList(value: string): boolean {
    const findRow = this.tags.find(
      tag => tag.name.toLowerCase() === value.toLowerCase()
    );
    return !!findRow;
  }
  updateFilterList() {
    this.filteredTags = this.inputCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: Tag | string | null) =>
        tag ? this._filter(tag) : this.notIncludedTags().slice(0, 10)
      )
    );
  }
  private notIncludedTags(): Tag[] {
    return this.allTags.filter(tag => {
      return !this.tags.some(t => tag.name === t.name);
    });
  }
  private _filter(tag: any): Tag[] {

    const value = tag.name ? tag.name : tag;
    const filterValue = value.toLowerCase();
    const notAddedTags = this.notIncludedTags();
    return notAddedTags.filter(
      tag => tag.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
