export enum PostStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const POST_STATUS_LABEL: Record<PostStatus, string> = {
  [PostStatus.ACTIVE]: 'Actif',
  [PostStatus.INACTIVE]: 'Inactif',
};
