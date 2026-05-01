//* Annual leave
export interface ConfigureAnnualBalanceRequest {
  balance: number;
}

export interface GetAnnualBalanceResponse {
  balance: number;
}

//* Exceptional leaves
export interface UpdateExceptionalLeavesRequest {
  exceptionalLeaves: UpdateExceptionalLeaveItem[];
}

export interface UpdateExceptionalLeaveItem {
  id: string;
  name: string;
  grantedDays: number;
}

export interface GetExceptionalLeaveResponse {
  id: string;
  name: string;
  legalBalance: number;
  grantedDays: number;
}