export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse {
  data: {
    lastUpdatedPassword: string;
  };
  message: string;
  timestamp: string;
  errorMessage?: string  ;
}