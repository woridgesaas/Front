export interface RequestChangePasswordRequest {
  currentPassword: string;
}

export interface VerifyChangePasswordOtpRequest {
  otpCode: string;
}

export interface ConfirmChangePasswordRequest {
  newPassword: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  timestamp: string;
  errorMessage?: string;
}
