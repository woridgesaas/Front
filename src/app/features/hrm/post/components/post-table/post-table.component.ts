import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { PostStatusLabelPipe } from '../../pipes/post-status-label.pipe';
import { Post } from '../../models/post.models';

@Component({
  selector: 'app-post-table',
  imports: [CommonModule, MatSortModule, PostStatusLabelPipe],
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.scss',
})
export class PostTableComponent {
  @Input() posts: Post[] = [];

  @Output() edit = new EventEmitter<Post>();
  @Output() toggleStatus = new EventEmitter<Post>();
  @Output() sort = new EventEmitter<Sort>();
}
