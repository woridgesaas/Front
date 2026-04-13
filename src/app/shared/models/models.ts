import { HolidaysStatus } from "../enum/holidays-status";
export interface NotificationItem {
  id: number;

  title: string;
  description: string;

  isRead: boolean;

  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  type: string;

  channel?: string;   // optionnel
  status?: string;    // optionnel

  createdAt: string;  // ISO string backend
}
export interface Sondage {
  id: number;
  titre: string;
  description?: string;
  auteur: string;
  departement: string;
  dateCreation: string;
  dateExpiration: string;
  statut: 'Actif' | 'Expiré';

  // Options du sondage
  options: SondageOption[];

  // donnes de participation
  totalVotes: number;
  tauxParticipation?: number;

  // Pour l'afficher (fil d'actualité)  (votant)
  selectedOption?: number;
  voted?: boolean;

  // Pour l'affichage admin
  participants?: number;
  participationRate?: number;
  expiration?: number;
  nbrOptions?: number;
  isSelected?: boolean;
}

export interface SondageOption {
  id: number;
  texte: string;
  votes: number;
  pourcentage?: number;
  couleur?: string; // Pour les charts
}
export interface SondageForm {
  titre: string;
  description?: string;
  options: string[];
}
export interface sondageEmployes {
  id: number;
  titre: string;
  creeIlYa: string;
  expireDans: number;
  options: string[];
  selectedOption?: number;
  voted: boolean;
  totalVotes: number;
}
export interface AnnonceForm {
  titre: string;
  contenu: string;
  visibilite: 'public' | 'departement';
  departementId?: number; //pour visibilite = departement
  hashtags?: string[];
}
export interface pageSelection {
  skip: number;
  limit: number;
}
export interface TicketBase {
  id: number;
  numeroTicket: string;
  titre: string;
  description?: string;
  categorie: string;
  priorite: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente' | 'Par default';
  statut: 'Ouvert' | 'En Cours' | 'Résolu' | 'Fermé';
  createdAt: string;
  isSelected?: boolean;
}

export interface TicketAdmin extends TicketBase {
  assignedTo: {
    id: number;
    nom: string;
    avatar: string;
  } | null;
  departement: string;
  updated: string;
}
export interface NewTicketForm {
  titre: string;
  description: string;
  categorie: string;
  priorite: 'Basse' | 'Moyenne' | 'Haute' | 'Urgente' | 'Par default';
  statut?: 'Ouvert' | 'En Cours' | 'Résolu' | 'Fermé';
  assignedTo?: number; // role = canAssigneTicket just
  departement?: string; // role = canAssigneTicket just
}
export interface TicketDetailData extends TicketBase {
  // Historique des statuts
  historiqueStatuts: Array<{
    date: string;
    statut: string;
    description: string;
  }>;

  // Pour les actions
  noteFermeture?: string;
}
export interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  role: string;
  department: string;
  status: 'online' | 'offline' | 'indisponible' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isPinned: boolean;
}
export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  type: 'text' | 'file' | 'image';
  content: string;
  fileName?: string;
  fileSize?: string;
  time: string;
  read: boolean;
  timestamp: Date;
}
export interface ChatItem {
  id: number;
  name: string;
  avatar?: string;
  type: 'contact' | 'group';
  lastMessage?: string;
  unreadCount?: number;
}
export interface SelectedItem {
  id: number;
  name: string;
  type: 'contact' | 'group';
}
export interface ChatGroupItem extends ChatItem {
  type: 'group';
  memberCount: number;
  description?: string;
  isAdmin?: boolean;
  members?: number[];
}
export interface ChatGroup {
  id: number;
  name: string;
  description: string;
  createdBy: {
    id: number;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  status: 'actif' | 'fermé';
  memberCount: number;
  members: number[];
  type: 'department' | 'announcement' | '';
  lastActivity?: Date;
  isSelected?: boolean;
}
export interface Justification {
  EmpId: string;
  Name: string;
  Image: string;
  Email: string;
  Phone: string;
  Designation: string;      // Département
  RequestDate?: string;     // Date de demande
  Document?: string;        // justificatif
  Status: 'En attente' | 'Accepter' | 'Refuser';
}


export interface ChartOptions {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  stroke?: ApexStroke;
  title?: ApexTitleSubtitle;
  labels?: string[];
  colors?: string[];
  plotOptions?: ApexPlotOptions;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  fill?: ApexFill;
}
export interface AuditLog {
  id: string;            
  timestamp: Date;      
  tenantId: string;      
  action: string;     
  status: string;          
  userMatricule: string; 
  userRole: string;     
  targetId: string;      
  service: string;         
  serviceName: string;   
  logType: string;  
  isSelected?: boolean;
}
export interface AuditLogMetadata {
  count: number;
  limit: number;
  period: {
    start: string;
    end: string;
  };
}
export interface AuditLogResponse {
  metadata: AuditLogMetadata;
  data: AuditLog[];
}
export interface DocumentDemande {
  id: string;
  documentCode: string;
  documentName: string;
  description: string;
  category: string;
  requestDate: Date;
  processedDate?: Date;
  status: 'completed' | 'in_progress' | 'pending' | 'rejected' | 'ready';
  notes?: string;
  isSelected?: boolean;
  sNo?: number;
} 
export interface RhDocumentDemande {
  id: number;
  uuid?: string;          // ← ajouter cette ligne seulement
  documentName: string;
  description: string;
  category: string;
  requestDate: Date;
  status: 'pending' | 'in_progress' | 'ready' | 'accepted' | 'rejected' | 'cancelled';
  processedDate?: Date;
  employeeId: number;
  employeeName: string;
  employeeAvatar?: string;
  employeeRole: string;
  employeeDepartment: string;
  employeeEmail: string;
  justification?: string;
  urgency?: 'low' | 'medium' | 'high';
  processedBy?: string;
  processingNotes?: string;
  documentType?: string;
  requiredFormat?: string;
  deliveryMethod?: 'email' | 'download' | 'print';
  estimatedProcessingDays: number;
  actualProcessingDays?: number;
}
export interface apiResultFormat {
  data: [];
  totalData: number;
}
export interface DocumentRequestApi {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
  documentCode: string;
  documentGroup: string;
  processingDate?: string;
  employeeCin?: string;

}
export interface adminSidebar {
  tittle: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: adminMenu[];
}
export interface adminMenu {
  menuValue: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  route?: string;
  subMenus?: adminSubMenus[];
  base?: string;
  boxIcon?: string;
}
export interface adminSubMenus {
  menuValue?: string;
  route?: string;
}
export interface url {
  url: string;
}

export interface apiResultFormat {
  data: [];
  totalData: number;
}
export interface adminSidebar {
  tittle: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: adminMenu[];
}
export interface adminMenu {
  menuValue: string;
  hasSubRoute: boolean;
  showSubRoute: boolean;
  route?: string;
  subMenus?: adminSubMenus[];
  base?: string;
  boxIcon?: string;
}
export interface adminSubMenus {
  menuValue?: string;
  route?: string;
}
export interface url {
  url: string;
}

export class register {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export class passwordResponce {
  passwordResponceText?: string;
  passwordResponceImage?: string;
  passwordResponceKey?: string;
}

export interface language {
  isSelected?: boolean;
  id: number;
  name: string;
  code: string;
  total: string;
  done: string;
  progress: number;
  img: string;
}
export interface languageadmin {
  isSelected?: boolean;
  id: number;
  medium: string;
  file: string;
  total: string;
  complete: string;
  progress: number;
}
export interface languageapp {
  isSelected?: boolean;
  id: number;
  medium: string;
  file: string;
  total: string;
  complete: string;
  progress: number;
}
export interface languagetranslate {
  isSelected?: boolean;
  id: number;
  medium: string;
  file: string;
  total: string;
  complete: string;
  progress: number;
}
export interface languageweb {
  isSelected?: boolean;
  moduleName: string;
  id: number;
  total: number;
  complete: number;
  progress: number;
}
export interface stories {
  isSelected?: boolean;
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  storiesDate: string;
  img: string;
}
export interface userList {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  regDate: string;
  country: string;
  lastSeen: string;
  img: string;
  isSelected?: boolean;
}
export interface inviteUser {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress: string;
  inviteDate: string;
  country: string;
  img: string;
  isSelected?: boolean;
}
export interface abuseMessage {
  isSelected?: boolean;
  id: number;
  reportedBy: string;
  reportedUser: string;
  totalMessageCount: string;
  date: string;
  img1: string;
  img: string;
}
export interface chatSidebar {
  boxIcon: string;
  tooltip: string;
  route: string;
  class?: string;
}

export interface PackageList {
  sNo?: number;
  isSelected: boolean;
  Plan_Name: string;
  Plan_Type: string;
  Total_Subscribers: string; // Alternatively, use number if you want a numerical type
  Price: string; // Alternatively, use number if you want to remove the "$" symbol
  Created_Date: string; // Alternatively, use Date if you want to store it as a Date object
  Status: string;
}
export interface dataTables {
  isSelected: boolean;
  sNo?: number;
  name?: string;
  position?: string;
  office?: string;
  age?: string;
  salary?: string;
  startDate?: string;
  id?: string;
}
export interface Star {
  show?: boolean;
  half?: boolean;
}

export interface SideBarMenu {
  showMyTab?: boolean;
  menuValue: string;
  route?: string | null;
  hasSubRoute?: boolean;
  showSubRoute: boolean;
  icon: string;
  base?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base7?: string;
  base8?: string;
  base9?: string;
  base10?: string;
  last1?: string;
  last?: string;
  page?: string;
  last2?: string;
  materialicons?: string;
  subMenus: SubMenu[];
  dot?: boolean;
  hasSubRouteTwo?: boolean;
  page1?: string;
  action?: string;
}
export interface breadCrumbItems {
  label: string;
  active?: boolean;
}
export interface SubMenu {
  menuValue: string;
  route?: string;
  base?: string;
  page?: string;
  page1?: string;
  page2?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
  dot?: boolean;
  currentActive?: boolean;
  hasSubRoute?: boolean;
  showSubRoute?: boolean;
  customSubmenuTwo?: boolean;
  subMenusTwo?: SubMenu[];
}
export interface SubMenusTwo {
  menuValue: string;
  route?: string;
  base?: string;
  page?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
  currentActive?: boolean;
  materialicons?: string;
  hasSubRoute?: boolean;
  showSubRoute?: boolean;
}

export interface SideBar {
  showMyTab?: boolean;
  tittle: string;
  icon?: string;
  showAsTab: boolean;
  base?: string;
  base2?: string;
  separateRoute: boolean;
  materialicons?: string;
  menu: SideBarMenu[];
  hasSubRoute?: boolean;
}

export interface SubMenuTwo {
  menuValue: string;
  route: string;
  base?: string;
  base1?: string;
  base2?: string;
  base3?: string;
  hasSubRoute?: boolean;
  showSubRoute?: boolean;
}

export interface SubMenu2 {
  menuValue: string;
  route?: string | null;
  base?: string;
  base1?: string;
  base2?: string;
  base3?: string;
  hasSubRoute?: boolean;
  showSubRoute?: boolean;
  customSubmenuTwo?: boolean;
  subMenusTwo?: SubMenuTwo[];
  action?: string; // ✅ Cette ligne existe déjà dans votre code
}

export interface Menu {
  menuValue: string;
  hasSubRouteTwo?: boolean;
  showSubRoute?: boolean;
  hasSubRoute?: boolean;
  icon?: string;
  base?: string;
  base1?: string;
  base2?: string;
  base3?: string;
  base4?: string;
  base5?: string;
  base6?: string;
  base7?: string;
  base8?: string;
  base9?: string;
  base10?: string;
  subMenus?: SubMenu2[];
  customSubmenuTwo?: boolean;
  subMenusTwo?: SubMenuTwo[];
  action?: string; // ✅ AJOUTEZ CETTE LIGNE
  route?: string | null; // ✅ AJOUTEZ AUSSI CELLE-CI si elle n'existe pas
}

export interface MainMenu {
  title: string;
  showAsTab: boolean;
  separateRoute: boolean;
  base?: string;
  menu: Menu[];
}

export interface activities {
  sNo?: number;
  isSelected: boolean;
  title: string;
  activityType: string;
  dueDate: string;
  owner: string;
  createdAt: string;
}

export interface Activity {
  sNo?: number;
  isSelected: boolean;
  Title: string;
  Activity_Type: string;
  Due_Date: string;
  Owner: string;
  Created_Date: string;
}

export interface employees {
  sNo?: number;
  isSelected: boolean;
  EmpId: string;
  Image: string;
  Name: string;
  CurrentRole: string;
  Email: string;
  Phone: string;
  Designation: string;
  JoiningDate: string;
  Status: string;
}

export interface Department {
id: string;
  name: string;
  noOfEmployees: number; // calculé côté front
  status: 'ACTIVE' | 'INACTIVE';
}

export interface designation {
  sNo?: number;
  isSelected: boolean;
  Designation: string;
  Department: string;
  NoOfEmployees: string;
  Status: string;
}

export interface Holiday {
  id: number;
  labelFr: string;    
  labelAr: string; 
  date: Date;
  duration: number;   
  isFixed: boolean;    
  status: HolidaysStatus
}
export interface HolidayRequest {
  labelFr: string;
  labelAr: string;
  date: Date | string;
  duration: number;
  isFixed: boolean; 
}

export interface attendanceadmin {
  Date: string | number | Date;
  Department: string | null;
  sNo?: number;
  isSelected?: boolean;
  Employee: string;
  Image: string;
  Role: string;
  CheckIn: string;
  CheckOut: string;
  Break: string;
  Late: string;
  Production: number;
  ProductionHours: string;
  Status: 'Present' | 'Absent' | 'Overtime';
  isOvertime?: boolean;
  overtimeDecision?: 'PENDING' | 'APPROVED' | 'REJECTED';
  employeeId?: string;
}

export interface attendanceemployee {
  sNo?: number;
  Date: string;
  CheckIn: string;
  Status: string;
  CheckOut: string;
  Break: string;
  Late: string;
  overtimeDecision?: 'PENDING' | 'APPROVED' | 'REJECTED';
  Production: number;
  ProductionHours: string;
  overtimeApproved?: boolean;
  isSelected?: boolean;
}
export type OvertimeDecision = 'APPROVED' | 'REJECTED' | 'PENDING';
export interface AttendanceRow {
  Date: string;
  CheckIn: string;
  CheckOut: string;
  ProductionHours: string | number;
  OvertimeDecision?: OvertimeDecision; // ⚠️ optionnel (API)
}
export interface Promotion {
  id?: string;
  CIN?: string;

  promotedEmployee?: string;
  department?: string;

  designationFrom?: string;
  designationTo?: string;

  oldSalary?: number;
  bonus?: number;
  newSalary?: number;

  promotionDate?: string;

  newPostId?: string;
}
export interface PromotionRequest {
  cin: string;
  bonus: number;
  newPostId: string;
  promotionDate: string;
}
export interface EmployeeInfoResponse {
  fullName: string;
  departmentName: string;
  currentPost: string;
  currentSalary: number;
}

export interface UpdatePromotionRequest {
  promotionId: string;
  newPostId: string;
  bonus: number;
  promotionDate: string;
}


export interface pageSizeCal {
  totalData: number;
  pageSize: number;
  tableData: any[];
  serialNumberArray?: number[]; // ✅ optionnel
}

export interface resignation {
resignation: any;
  sNo?: number;
  isSelected: boolean;
  Image: string;
  ResigningEmployee: string;
  Department: string;
  Reason: string;
  NoticeDate: Date | null;
  ResignationDate: Date | null;
}

export interface Activity {
  sNo?: number;
  isSelected: boolean;
  Title: string;
  Activity_Type: string;
  Due_Date: string;
  Owner: string;
  Created_Date: string;
}
export interface JobsInfo {
  sNo?: number;
  isSelected: boolean;
  Job_ID: string;
  Experience: string;
  Image: string;
  Job_Title: string;
  Roll: string;
  Category: string;
  Location: string;
  Salary_Range: string;
  Posted_Date: string;
}

export interface CandidateInfo {
  sNo?: number;
  isSelected: boolean;
  Cand_ID: string;
  Image: string;
  Candidate: string;
  Email: string;
  Applied_Role: string;
  Phone: string;
  Applied_Date: string;
  Status: string;
}

export interface leaveAdmin {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  Employee: string;
  Role: string;
  LeaveType: string;
  From: string;
  To: string;
  NoOfDays: string;
}

export interface leaveEmployee {
  sNo?: number;
  isSelected: boolean;
  LeaveType: string;
  Image: string;
  From: string;
  ApprovedBy: string;
  Roll: string;
  To: string;
  NoOfDays: string;
  Status: string;
  justificatif?: File;
}

export interface InvoiceList {
  sNo?: number;
  isSelected: boolean;
  Invoice: string;
  Image: string;
  Name: string;
  Roll: string; // If 'Roll' represents the role, you may want to rename it to 'Role'
  Created_On: string;
  Total: string;
  Amount_Due: string;
  Due_Date: string;
  Status: string;
}

export interface InvoicePaymentDetails {
  sNo?: number;
  isSelected: boolean;
  Invoice_ID: string;
  Image: string;
  Client_Name: string;
  Roll: string; // Consider renaming to 'Role' if it refers to job role
  Company_Name: string;
  Payment_Type: string;
  Paid_Date: string;
  Paid_Amount: string;
}

export interface employeeSalary {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  EmpID: string;
  Name: string;
  Department: string;
  Email: string;
  Phone: string;
  Designation: string;
  JoiningDate: string;
  Salary: string;
  PaySlip: string;
}

export interface payslipReport {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  Name: string;
  Role: string;
  PaidAmount: string;
  PaidMonth: string;
  PaidYear: string;
}

export interface leaveReport {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  InvoiceID: string;
  ClientName: string;
  Role: string;
  CompanyName: string;
  CreatedDate: string;
  DueDate: string;
  Amount: string;
  Status: string;
}

export interface employeeReport {
  sNo?: number;
  isSelected: boolean;
  EmpID: string;
  Image: string;
  Name: string;
  Role: string;
  Email: string;
  Department: string;
  Phone: string;
  JoiningDate: string;
  Status: string;
}

export interface dailyReport {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  Name: string;
  Role: string;
  Date: string;
  Department: string;
  Status: string;
}

export interface attendanceReport {
  sNo?: number;
  isSelected: boolean;
  Name: string;
  Image: string;
  Role: string;
  Date: string;
  CheckIn: string;
  Status: string;
  CheckOut: string;
  Break: string;
  Late: string;
  Overtime: string;
  Progress: number;
  ProductionHours: string;
}
export interface ApiData {
  sNo?: number;
  isSelected: boolean;
  Image: string;
  serviceName: string;
  createdBy: string;
  apiKey: string;
  status: string;
  createdDate: string;
}
