import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractEditorService {
  constructor(private http:HttpClient){}
  getVariableCategories() {
    return [
      {
        name: 'employe',
        label: '👤 Employé',
        variables: [
          { code: '{NOM_COMPLET}', description: 'Nom complet' },
          { code: '{CIN}', description: 'Carte d\'identité nationale' },
          { code: '{DATE_NAISSANCE}', description: 'Date de naissance' },
          { code: '{ADRESSE_EMPLOYE}', description: 'Adresse complète' },
          { code: '{NATIONALITE}', description: 'Nationalité' },
          { code: '{SITUATION_FAMILIALE}', description: 'Situation familiale' }
        ]
      },
      {
        name: 'entreprise',
        label: '🏢 Entreprise', 
        variables: [
          { code: '{NOM_ENTREPRISE}', description: 'Raison sociale' },
          { code: '{ICE}', description: 'Identifiant Commun Entreprise' },
          { code: '{IF}', description: 'Identifiant Fiscal' },
          { code: '{ADRESSE_ENTREPRISE}', description: 'Siège social' }
        ]
      },
      {
        name: 'contrat',
        label: '📄 Contrat',
        variables: [
          { code: '{TYPE_CONTRAT}', description: 'CDI, CDD, Stage' },
          { code: '{DATE_EMBAUCHE}', description: 'Date d\'embauche' },
          { code: '{PERIODE_ESSAI}', description: 'Durée période d\'essai' }
        ]
      },
      {
        name: 'salaire',
        label: '💰 Salaire',
        variables: [
          { code: '{SALAIRE_BRUT_MENSUEL}', description: 'Salaire brut mensuel' },
          { code: '{SALAIRE_NET_MENSUEL}', description: 'Salaire net mensuel' },
          { code: '{SALAIRE_EN_LETTRES}', description: 'Salaire en lettres' }
        ]
      },
      {
        name: 'conges', 
        label: '⏰ Congés',
        variables: [
          { code: '{CONGES_PAYES_ACQUIS}', description: 'Congés acquis' },
          { code: '{SOLDE_CONGE}', description: 'Solde de congés' },
          { code: '{JOUR_REPOS_HEBDOMADAIRE}', description: 'Jour de repos' }
        ]
      }
    ];
  }
  getAllVariables(): string[] {
    return this.getVariableCategories()
      .flatMap(cat => cat.variables.map(v => v.code));
  }
  searchVariables(searchTerm: string): any[] {
    const categories = this.getVariableCategories();
    return categories.flatMap(cat => 
      cat.variables.filter(v => 
        v.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  getContractExemple():Observable<string>{
      return this.http.get("/assets/json/contract-exemple.html",{ responseType: 'text' })
  }

  /** methode to clean before sending to backend */
  cleanContent(content:string):string{
    return content.replace(/<span[^>]*class="[^"]*variable[^"]*"[^>]*>([^<]+)<\/span>/gi,'$1')
  }
}
