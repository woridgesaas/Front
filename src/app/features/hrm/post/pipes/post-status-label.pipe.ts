import { Pipe, PipeTransform } from '@angular/core';
import { POST_STATUS_LABEL, PostStatus } from '../enums/post-status.enum';

@Pipe({ name: 'postStatusLabel', standalone: true })
export class PostStatusLabelPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '—';
    return POST_STATUS_LABEL[value as PostStatus] ?? value;
  }
}
