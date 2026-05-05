import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Sort } from '@angular/material/sort';

import {
  GetAllPostsResponse,
  GetSpecificPostResponse,
  AddPostRequest,
  UpdatePostRequest,
  UpdatePostStatusRequest,
} from './models/post.models';
import { PostService } from './services/post.service';
import { ApiErrorHandler } from '../../../shared/utils/api-error-handler.utils';
import { KpisComponent } from '../../common/kpis/kpis.component';
import { PostFiltersComponent } from './components/post-filters/post-filters.component';
import { PostTableComponent } from './components/post-table/post-table.component';
import { AddPostModalComponent } from './modals/add-post-modal/add-post-modal.component';
import { EditPostModalComponent } from './modals/edit-post-modal/edit-post-modal.component';
import { BreadcrumbsComponent } from '../../common/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    KpisComponent,
    PostFiltersComponent,
    PostTableComponent,
    AddPostModalComponent,
    EditPostModalComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  posts: GetAllPostsResponse[] = [];
  filteredPosts: GetAllPostsResponse[] = [];

  searchValue = '';
  selectedStatus = 'all';

  openAddModal = false;
  isEditModalOpen = false;
  selectedPost: GetSpecificPostResponse | null = null;

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  //* KPIs
  get kpis() {
    return [
      {
        title: 'Total postes',
        value: this.filteredPosts.length,
        icon: 'ti ti-briefcase',
        color: 'primary',
      },
      {
        title: 'Postes actifs',
        value: this.filteredPosts.filter((p) => p.status === 'ACTIVE').length,
        icon: 'ti ti-check',
        color: 'success',
      },
      {
        title: 'Postes inactifs',
        value: this.filteredPosts.filter((p) => p.status === 'INACTIVE').length,
        icon: 'ti ti-x',
        color: 'danger',
      },
    ];
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyFilters();
      },
      error: (err) => ApiErrorHandler.handle(err, this.toastr),
    });
  }

  applyFilters(): void {
    const search = this.searchValue.toLowerCase().trim();
    this.filteredPosts = this.posts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search);
      const matchStatus =
        this.selectedStatus === 'all' || p.status === this.selectedStatus;
      return matchSearch && matchStatus;
    });
  }

  set search(v: string) {
    this.searchValue = v;
    this.applyFilters();
  }

  set status(v: string) {
    this.selectedStatus = v;
    this.applyFilters();
  }

  //* Sort
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.filteredPosts = [...this.posts];
      return;
    }
    this.filteredPosts = [...this.filteredPosts].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      switch (sort.active) {
        case 'name':
          return a.name.localeCompare(b.name) * dir;
        case 'baseSalary':
          return (a.baseSalary - b.baseSalary) * dir;
        case 'status':
          return a.status.localeCompare(b.status) * dir;
        default:
          return 0;
      }
    });
  }

  //* Add post
  addPost(payload: AddPostRequest): void {
    this.postService.addPost(payload).subscribe({
      next: () => {
        this.toastr.success('Poste ajouté avec succès');
        this.openAddModal = false;
        this.loadPosts();
      },
      error: (err) => ApiErrorHandler.handle(err, this.toastr),
    });
  }

  //* Update post
  openEdit(post: GetAllPostsResponse): void {
    this.postService.getPostById(post.id).subscribe({
      next: (data) => {
        this.selectedPost = data;
        this.isEditModalOpen = true;
      },
      error: (err) => ApiErrorHandler.handle(err, this.toastr),
    });
  }

  saveEdit(payload: UpdatePostRequest): void {
    this.postService.updatePost(payload.id, payload).subscribe({
      next: () => {
        this.toastr.success('Poste modifié avec succès');
        this.isEditModalOpen = false;
        this.loadPosts();
      },
      error: (err) => ApiErrorHandler.handle(err, this.toastr),
    });
  }

  //* Toggle status
  toggleStatus(post: GetAllPostsResponse): void {
    const newStatus = post.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const payload: UpdatePostStatusRequest = { id: post.id, status: newStatus };

    this.postService.updatePostStatus(post.id, payload).subscribe({
      next: () => {
        this.toastr.success(
          newStatus === 'ACTIVE'
            ? 'Poste activé avec succès'
            : 'Poste désactivé avec succès',
        );
        this.loadPosts();
      },
      error: (err) => ApiErrorHandler.handle(err, this.toastr),
    });
  }
}
