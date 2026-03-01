export interface Resignation {
  id?: string;
  userId?: string;
  cin?: string;
  userFullName?: string;
  departmentName?: string;
  reason: string;
  noticeDate: Date | null;
  resignationDate: Date | null;
  isSelected?: boolean;

//ancien 
  sNo?: number;
  resignation?: any;
  // isSelected?: boolean;
  Image?: string;
  ResigningEmployee?: string;
  Department?: string;
  Reason?: string;
  NoticeDate?: Date | null;
  ResignationDate?: Date | null;
}

export interface UserSearch {
  id: string;
  cin: string;
  fullName: string;
  departmentName: string;
}