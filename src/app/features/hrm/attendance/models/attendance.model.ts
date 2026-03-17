// Modèle local attendance — indépendant du shared
export interface AttendanceAdmin {
    sNo?: number;
    isSelected?: boolean;
    Employee: string;
    Image: string;
    Role: string;
    Department: string | null;
    Date: string | number | Date;
    CheckIn: string;
    CheckOut: string;
    Break: string;
    Late: string;
    Production: number;
    ProductionHours: string;
    Status: 'Present' | 'Absent' | 'Overtime';
    isOvertime?: boolean;
    overtimeDecision?: 'PENDING' | 'APPROVED' | 'REJECTED';
  
    // ✅ Ajout pour RFID enrollment
    employeeId?: string;   // UUID de l'employé en DB
    hasRfidCard?: boolean; // true = carte déjà associée
  }
  
  // Réponse du backend après enrollment
  export interface EnrollResponse {
    action: string;        // ENROLLED
    employeeName: string;
  }
  
  // Réponse du backend après scan
  export interface ScanResponse {
    action: string;        // CHECK_IN, CHECK_OUT
    employeeName: string;
    checkInTime: string;
    checkOutTime: string;
  }