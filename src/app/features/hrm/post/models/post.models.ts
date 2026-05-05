export interface Post {
  id: string;
  name: string;
  baseSalary: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

export interface AddPostRequest {
  name: string;
  baseSalary: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface AddPostResponse {
  id: string;
  name: string;
  baseSalary: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface UpdatePostRequest {
  id: string;
  name: string;
  baseSalary: number;
}

export interface UpdatePostStatusRequest {
  id: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface GetAllPostsResponse {
  id: string;
  name: string;
  baseSalary: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

export interface GetSpecificPostResponse {
  id: string;
  name: string;
  baseSalary: number;
  status: 'ACTIVE' | 'INACTIVE';
}
