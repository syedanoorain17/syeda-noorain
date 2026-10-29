import { CourseSpecification } from '../types';

export const PO_LIST = [
  { key: 'PO1', title: 'Engineering Knowledge', short: 'Knowledge' },
  { key: 'PO2', title: 'Problem Analysis', short: 'Analysis' },
  { key: 'PO3', title: 'Design/Development of Solutions', short: 'Design' },
  { key: 'PO4', title: 'Conduct Investigations of Complex Problems', short: 'Investigate' },
  { key: 'PO5', title: 'Modern Tool Usage', short: 'Tools' },
  { key: 'PO6', title: 'The Engineer and Society', short: 'Society' },
  { key: 'PO7', title: 'Environment and Sustainability', short: 'Environment' },
  { key: 'PO8', title: 'Ethics', short: 'Ethics' },
  { key: 'PO9', title: 'Individual and Team Work', short: 'Teamwork' },
  { key: 'PO10', title: 'Communication', short: 'Comm' },
  { key: 'PO11', title: 'Project Management and Finance', short: 'Management' },
  { key: 'PO12', title: 'Life-long Learning', short: 'Learning' }
];

export const PSO_LIST = [
  { key: 'PSO1', title: 'Core Systems Programming & Runtime Foundations', short: 'Systems' },
  { key: 'PSO2', title: 'Data Engineering & Scalable Distributed Storage', short: 'Data Eng' },
  { key: 'PSO3', title: 'Algorithmic Optimization & Computational Rigor', short: 'Algorithms' }
];

export const INITIAL_COURSE_DATA: CourseSpecification = {
  code: 'CS302',
  title: 'Data Structures & Algorithms',
  department: 'Computer Science & Engineering',
  academicYear: 'AY 2024–25',
  degree: 'B.Tech (Honors)',
  semester: 'Autumn (III / IV)',
  credits: 4.0,
  ltp: {
    lecture: 3,
    tutorial: 1,
    practical: 0
  },
  totalHours: 60,
  prerequisites: 'CS101 Introduction to Computing, CS201 Discrete Mathematical Structures',
  description: 'Rigorous exploration of abstract data types, recursive algorithm design, complexity bounds (Big-O, Omega, Theta), balanced search trees, graph networks, and persistent hash tables with formal proofs of correctness.',
  status: 'Review Pending',
  bosCertificateHash: 'BOS-ENG-2024-CS302-89AF1',
  outcomes: [
    {
      id: 'co-1',
      code: 'CO1',
      statement: 'Analyze asymptotic worst-case and amortized time-space complexity of recursive and iterative algorithms using recurrence master theorem.',
      bloomsLevel: 'Analyze (L4)',
      contactHours: 12,
      cieWeight: 20,
      seeWeight: 20
    },
    {
      id: 'co-2',
      code: 'CO2',
      statement: 'Implement and verify abstract linear data representations including dynamic arrays, double-ended queues, and lock-free linked lists.',
      bloomsLevel: 'Apply (L3)',
      contactHours: 11,
      cieWeight: 20,
      seeWeight: 20
    },
    {
      id: 'co-3',
      code: 'CO3',
      statement: 'Construct self-balancing search structures (AVL, Red-Black Trees, B+ Trees) and evaluate insertion/deletion rotation overhead.',
      bloomsLevel: 'Create (L6)',
      contactHours: 13,
      cieWeight: 20,
      seeWeight: 20
    },
    {
      id: 'co-4',
      code: 'CO4',
      statement: 'Formulate and apply optimal network traversal, minimum spanning tree (Kruskal, Prim), and single-source shortest path (Dijkstra) algorithms.',
      bloomsLevel: 'Apply (L3)',
      contactHours: 14,
      cieWeight: 20,
      seeWeight: 20
    },
    {
      id: 'co-5',
      code: 'CO5',
      statement: 'Evaluate cryptographic and non-cryptographic hashing functions, probing heuristics, and collision resolution trade-offs for high-throughput lookup.',
      bloomsLevel: 'Evaluate (L5)',
      contactHours: 10,
      cieWeight: 20,
      seeWeight: 20
    }
  ],
  modules: [
    {
      id: 'mod-1',
      unitNumber: 1,
      title: 'Foundations of Algorithm Analysis & Linear Structures',
      lectureHours: 10,
      tutorialHours: 3,
      topics: 'Asymptotic notation (O, Ω, Θ, o, ω); recurrence relations; substitution and recursion tree methods; master theorem; abstract data types; dynamic array amortized doubling; circular doubly-linked lists; stacks, queues, and priority heaps.',
      textbookRefs: 'Cormen et al., Introduction to Algorithms (CLRS), Ch. 1-4, 10'
    },
    {
      id: 'mod-2',
      unitNumber: 2,
      title: 'Hierarchical & Self-Balancing Tree Structures',
      lectureHours: 10,
      tutorialHours: 3,
      topics: 'Binary search tree invariants; tree traversal orderings; balanced binary trees; AVL height balances and single/double rotations; Red-Black properties and recoloring rules; multi-way B-Trees and B+ trees for block storage.',
      textbookRefs: 'Mark Allen Weiss, Data Structures & Algorithm Analysis, Ch. 4'
    },
    {
      id: 'mod-3',
      unitNumber: 3,
      title: 'Graph Algorithms & Topological Optimization',
      lectureHours: 12,
      tutorialHours: 4,
      topics: 'Adjacency list/matrix memory bounds; BFS, DFS with discovery/finish timestamps; topological sort; strongly connected components (Kosaraju, Tarjan); Minimum Spanning Trees (Prim, Kruskal with disjoint-set union-find); Dijkstra & Bellman-Ford.',
      textbookRefs: 'CLRS Ch. 22-24; Kleinberg & Tardos, Algorithm Design Ch. 3-4'
    },
    {
      id: 'mod-4',
      unitNumber: 4,
      title: 'Associative Structures, Hashing & String Matching',
      lectureHours: 8,
      tutorialHours: 3,
      topics: 'Direct address tables; universal hashing; open addressing (linear, quadratic, double hashing); cuckoo hashing; string pattern matching: Knuth-Morris-Pratt (KMP) failure function; Rabin-Karp rolling hashes; suffix tries.',
      textbookRefs: 'CLRS Ch. 11, 32; Sedgewick & Wayne, Algorithms Ch. 3.4'
    },
    {
      id: 'mod-5',
      unitNumber: 5,
      title: 'Advanced Heuristics, Dynamic Programming & NP-Completeness',
      lectureHours: 5,
      tutorialHours: 2,
      topics: 'Greedy choice property vs optimal substructure; dynamic programming memoization; 0/1 knapsack; matrix chain multiplication; Introduction to P, NP, and polynomial-time verifiers.',
      textbookRefs: 'CLRS Ch. 15-16, 34'
    }
  ],
  alignmentMatrix: {
    'co-1': {
      PO1: 3, PO2: 3, PO3: 2, PO4: 2, PO5: 1, PO6: 0, PO7: 0, PO8: 0, PO9: 0, PO10: 1, PO11: 0, PO12: 2,
      PSO1: 2, PSO2: 1, PSO3: 3
    },
    'co-2': {
      PO1: 3, PO2: 2, PO3: 3, PO4: 1, PO5: 2, PO6: 0, PO7: 0, PO8: 0, PO9: 1, PO10: 1, PO11: 1, PO12: 2,
      PSO1: 3, PSO2: 2, PSO3: 3
    },
    'co-3': {
      PO1: 3, PO2: 3, PO3: 3, PO4: 2, PO5: 2, PO6: 0, PO7: 0, PO8: 0, PO9: 1, PO10: 0, PO11: 0, PO12: 2,
      PSO1: 3, PSO2: 3, PSO3: 3
    },
    'co-4': {
      PO1: 3, PO2: 3, PO3: 3, PO4: 3, PO5: 2, PO6: 1, PO7: 1, PO8: 0, PO9: 2, PO10: 1, PO11: 1, PO12: 3,
      PSO1: 2, PSO2: 3, PSO3: 3
    },
    'co-5': {
      PO1: 3, PO2: 2, PO3: 3, PO4: 2, PO5: 2, PO6: 0, PO7: 0, PO8: 1, PO9: 1, PO10: 0, PO11: 0, PO12: 2,
      PSO1: 3, PSO2: 3, PSO3: 2
    }
  },
  defects: [
    {
      id: 'def-1',
      code: 'NBA-VERB-01',
      title: 'Bloom’s Action Verb Alignment in CO2',
      description: 'CO2 formulation in initial draft contained passive verb "Understand linear data structures". NBA accreditation rubric mandates measurable action verbs.',
      severity: 'Critical',
      targetSection: 'Course Outcomes (CO2)',
      recommendation: 'Replaced "Understand" with "Implement and verify abstract linear data representations".',
      resolved: true,
      autoFixAvailable: true
    },
    {
      id: 'def-2',
      code: 'NBA-MAP-07',
      title: 'Under-mapped PO7 (Environment & Sustainability)',
      description: 'PO7 currently has only a single slight correlation (1) in CO4. Accreditation guidelines suggest explicit energy-efficient algorithmic consideration or green computing analysis.',
      severity: 'Warning',
      targetSection: 'CO-PO Alignment Matrix',
      recommendation: 'Incorporate computational energy efficiency metrics into CO4 (Graph heuristics for reduced server compute consumption).',
      resolved: false,
      autoFixAvailable: true
    },
    {
      id: 'def-3',
      code: 'NBA-MAP-08',
      title: 'Weak Ethics Coverage (PO8)',
      description: 'CO5 has slight mapping (1) to PO8 Ethics. Recommend explicitly detailing algorithmic privacy and fair hashing in hashing collisions module.',
      severity: 'Advisory',
      targetSection: 'CO-PO Alignment Matrix',
      recommendation: 'Enhance Module 4 with ethics discussion on hashing data leakage and algorithmic bias.',
      resolved: false,
      autoFixAvailable: true
    },
    {
      id: 'def-4',
      code: 'ACAD-HOUR-01',
      title: 'Credit-Hour Balance Verification',
      description: 'L-T-P of 3-1-0 specifies 45 lecture hours + 15 tutorial hours = 60 contact hours. Current syllabus modules total exactly 60 hours.',
      severity: 'Advisory',
      targetSection: 'Course Modules',
      recommendation: 'Maintain current contact hour balance across semester timeline.',
      resolved: true,
      autoFixAvailable: false
    },
    {
      id: 'def-5',
      code: 'ASSESS-WT-01',
      title: 'Continuous Internal Evaluation (CIE) Weight Parity',
      description: 'All 5 outcomes are evenly distributed with 20% CIE and 20% SEE weightage totaling 100% assessment coverage.',
      severity: 'Advisory',
      targetSection: 'Assessment Weights',
      recommendation: 'Distribution is balanced and adheres to Academic Council ordinance.',
      resolved: true,
      autoFixAvailable: false
    }
  ],
  workflowHistory: [
    {
      id: 'wf-1',
      role: 'Author',
      actorName: 'Dr. Aris Thorne (Faculty In-Charge)',
      action: 'Created',
      timestamp: '2024-10-14 09:30 AM',
      comment: 'Initial syllabus specification ingested from departmental curriculum blueprint.',
      statusAfter: 'Draft'
    },
    {
      id: 'wf-2',
      role: 'Author',
      actorName: 'Dr. Aris Thorne (Faculty In-Charge)',
      action: 'Submitted',
      timestamp: '2024-10-18 04:15 PM',
      comment: 'Aligned Bloom levels to revised taxonomy. Ready for peer review.',
      statusAfter: 'Review Pending'
    },
    {
      id: 'wf-3',
      role: 'Reviewer',
      actorName: 'Prof. Eleanor Vance (Senior Curriculum Auditor)',
      action: 'Reviewed',
      timestamp: '2024-10-22 11:20 AM',
      comment: 'Defect check identified PO7 under-mapping. Recommend remediating energy complexity before BOS endorsement.',
      statusAfter: 'Needs Revision'
    }
  ]
};
