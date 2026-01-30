export interface ContratType {
  id: 'cdi' | 'cdd';
  nom: string;
  description?: string;
  lastUpdate: Date;
  category: string;
}
