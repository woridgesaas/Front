export enum BankName {
  CIH_BANK = 'CIH_BANK',
  ATTIJARIWAFA_BANK = 'ATTIJARIWAFA_BANK',
  POPULAIRE_BANK = 'POPULAIRE_BANK',
  BMCE_BANK = 'BMCE_BANK',
  CREDIT_AGRICOLE = 'CREDIT_AGRICOLE',
  AL_BARID_BANK = 'AL_BARID_BANK',
}

export const BANK_NAME: Record<BankName, string> = {
  [BankName.CIH_BANK]: 'CIH Bank',
  [BankName.ATTIJARIWAFA_BANK]: 'Attijariwafa Bank',
  [BankName.POPULAIRE_BANK]: 'Banque Populaire',
  [BankName.BMCE_BANK]: 'BMCE Bank',
  [BankName.CREDIT_AGRICOLE]: 'Crédit Agricole',
  [BankName.AL_BARID_BANK]: 'Al Barid Bank',
};
