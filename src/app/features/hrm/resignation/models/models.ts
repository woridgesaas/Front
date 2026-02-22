export interface resignation {
    sNo?: number;        // ← C'est l'ID qui vient du backend
    resignation: any;
    isSelected: boolean;
    Image: string;
    ResigningEmployee: string;
    Department: string;
    Reason: string;
    NoticeDate: Date | null;
    ResignationDate: Date | null;
  }