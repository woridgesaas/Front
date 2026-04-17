export interface AddBankInformationRequest {
  name: string;
  accountHolderName: string;
  RIB: string;
  IBAN: string;
  agencyName: string | null;
  agencyCity: string | null;
}
