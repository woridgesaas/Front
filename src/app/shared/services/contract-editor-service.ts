import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// ── Interfaces (à placer dans shared/models si vous préférez) ──────────────
export interface CandidateModel {
  id: number;
  applicationName: string;
  candidateEmail: string;   // nom exact retourné par le backend
  candidatePhone?: string;
  location?: string;
  detectedCategory: string;
  status: string;
  createdAt?: string;
  cvStorageUrl?: string;
}

export interface GenerateContractRequest {
  contractHtml: string;
  candidateEmail: string;
  candidateName: string;
}

export interface ContractResponse {
  id: number;
  jobApplicationId: number;
  contractHtml: string;
  status: 'GENERATED' | 'SENT' | 'SIGNED';
  generatedAt: string;
  sentAt: string | null;
}
// ─────────────────────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root',
})
export class ContractEditorService {

  // Lire l'URL Gateway depuis les variables d'environnement
  private gatewayUrl = (import.meta as any).env?.NG_APP_GATEWAY_URL ?? 'http://localhost:8000';
  private candidatesUrl = `${this.gatewayUrl}/api/candidates`;

  constructor(private http: HttpClient) {}

  // ── Méthodes existantes (inchangées) ──────────────────────────────────────

  getVariableCategories() {
    return [
      {
        name: 'employe',
        label: 'Employé',                           // emojis supprimés
        variables: [
          { code: '{NOM_COMPLET}', description: 'Nom complet' },
          { code: '{CIN}', description: "Carte d'identité nationale" },
          { code: '{DATE_NAISSANCE}', description: 'Date de naissance' },
          { code: '{ADRESSE_EMPLOYE}', description: 'Adresse complète' },
          { code: '{NATIONALITE}', description: 'Nationalité' },
          { code: '{SITUATION_FAMILIALE}', description: 'Situation familiale' },
        ],
      },
      {
        name: 'entreprise',
        label: 'Entreprise',
        variables: [
          { code: '{NOM_ENTREPRISE}', description: 'Raison sociale' },
          { code: '{ICE}', description: 'Identifiant Commun Entreprise' },
          { code: '{IF}', description: 'Identifiant Fiscal' },
          { code: '{ADRESSE_ENTREPRISE}', description: 'Siège social' },
        ],
      },
      {
        name: 'contrat',
        label: 'Contrat',
        variables: [
          { code: '{TYPE_CONTRAT}', description: 'CDI, CDD, Stage' },
          { code: '{DATE_EMBAUCHE}', description: "Date d'embauche" },
          { code: '{PERIODE_ESSAI}', description: "Durée période d'essai" },
        ],
      },
      {
        name: 'salaire',
        label: 'Salaire',
        variables: [
          { code: '{SALAIRE_BRUT_MENSUEL}', description: 'Salaire brut mensuel' },
          { code: '{SALAIRE_NET_MENSUEL}', description: 'Salaire net mensuel' },
          { code: '{SALAIRE_EN_LETTRES}', description: 'Salaire en lettres' },
        ],
      },
      {
        name: 'conges',
        label: 'Congés',
        variables: [
          { code: '{CONGES_PAYES_ACQUIS}', description: 'Congés acquis' },
          { code: '{SOLDE_CONGE}', description: 'Solde de congés' },
          { code: '{JOUR_REPOS_HEBDOMADAIRE}', description: 'Jour de repos' },
        ],
      },
    ];
  }

  getAllVariables(): string[] {
    return this.getVariableCategories().flatMap(cat => cat.variables.map(v => v.code));
  }

  searchVariables(searchTerm: string): any[] {
    return this.getVariableCategories().flatMap(cat =>
      cat.variables.filter(
        v =>
          v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  getContractExemple(): Observable<string> {
    return this.http.get('/assets/json/contract-exemple.html', { responseType: 'text' });
  }

  cleanContent(content: string): string {
    return content.replace(/<span[^>]*class="[^"]*variable[^"]*"[^>]*>([^<]+)<\/span>/gi, '$1');
  }

  // ── Nouvelles méthodes ms-candidate ───────────────────────────────────────

  /** GET /api/candidates — filtre par statut côté front */
  getAllCandidates(): Observable<CandidateModel[]> {
    return this.http.get<CandidateModel[]>(this.candidatesUrl);
  }

  /** GET /api/candidates/{id} */
  getCandidateById(id: number): Observable<CandidateModel> {
    return this.http.get<CandidateModel>(`${this.candidatesUrl}/${id}`);
  }

  /** POST /api/candidates/{id}/generate-contract */
  generateContract(id: number, request: GenerateContractRequest): Observable<ContractResponse> {
    // Le DTO C# est un record positionnel → sensible à la casse → PascalCase obligatoire
    const body = {
      ContractHtml:   request.contractHtml,
      CandidateEmail: request.candidateEmail,
      CandidateName:  request.candidateName,
    };
    return this.http.post<ContractResponse>(
      `${this.candidatesUrl}/${id}/generate-contract`,
      body
    );
  }
}
