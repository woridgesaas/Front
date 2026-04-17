export interface UpdateBankInformationRequest {
  id: string;
  name: string;
  accountHolderName: string;
  RIB: string;
  IBAN: string;
  agencyName: string | null;
  agencyCity: string | null;
}
