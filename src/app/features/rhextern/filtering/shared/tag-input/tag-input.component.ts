
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss',
})
export class TagInputComponent {
  @Input() placeholder = 'Ajouter...';
  @Input() selectedTags: string[] = [];
  @Output() selectedTagsChange = new EventEmitter<string[]>();

  inputValue = '';

  addTag(): void {
    const tag = this.inputValue.trim();
    if (tag && !this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
      this.inputValue = '';
      this.selectedTagsChange.emit(this.selectedTags);
    }
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.selectedTagsChange.emit(this.selectedTags);
    }
  }
}