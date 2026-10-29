export type Role = 'Author' | 'Reviewer' | 'HOD';

export type StageId = 'upload' | 'spec' | 'matrix' | 'checks' | 'remediation' | 'workflow' | 'export';

export type CourseStatus = 'Draft' | 'Review Pending' | 'Needs Revision' | 'Approved' | 'Accredited';

export interface CourseOutcome {
  id: string;
  code: string; // e.g. CO1
  statement: string;
  bloomsLevel: 'Remember (L1)' | 'Understand (L2)' | 'Apply (L3)' | 'Analyze (L4)' | 'Evaluate (L5)' | 'Create (L6)';
  contactHours: number;
  cieWeight: number; // percentage
  seeWeight: number; // percentage
}

export interface CourseModule {
  id: string;
  unitNumber: number;
  title: string;
  lectureHours: number;
  tutorialHours: number;
  topics: string;
  textbookRefs: string;
}

export interface ComplianceDefect {
  id: string;
  code: string;
  title: string;
  description: string;
  severity: 'Critical' | 'Warning' | 'Advisory';
  targetSection: string;
  recommendation: string;
  resolved: boolean;
  autoFixAvailable: boolean;
}

export interface WorkflowAction {
  id: string;
  role: Role;
  actorName: string;
  action: 'Created' | 'Submitted' | 'Reviewed' | 'Revision Requested' | 'Approved' | 'Endorsed';
  timestamp: string;
  comment?: string;
  statusAfter: CourseStatus;
}

export interface CourseSpecification {
  code: string;
  title: string;
  department: string;
  academicYear: string;
  degree: string;
  semester: string;
  credits: number;
  ltp: {
    lecture: number;
    tutorial: number;
    practical: number;
  };
  totalHours: number;
  prerequisites: string;
  description: string;
  status: CourseStatus;
  outcomes: CourseOutcome[];
  modules: CourseModule[];
  // Mapping matrix: outcomeId -> { [columnKey: string]: 0 | 1 | 2 | 3 }
  alignmentMatrix: Record<string, Record<string, number>>;
  defects: ComplianceDefect[];
  workflowHistory: WorkflowAction[];
  bosCertificateHash?: string;
}
