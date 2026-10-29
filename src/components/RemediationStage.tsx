import React, { useState } from 'react';
import { CourseSpecification } from '../types';

interface RemediationStageProps {
  course: CourseSpecification;
  onAdvanceToWorkflow: () => void;
  onAcceptAll: () => void;
}

export const RemediationStage: React.FC<RemediationStageProps> = ({
  course,
  onAdvanceToWorkflow,
  onAcceptAll,
}) => {
  const [acceptedItems, setAcceptedItems] = useState<Record<string, boolean>>({
    'diff-1': true,
    'diff-2': true,
    'diff-3': true
  });

  const diffItems = [
    {
      id: 'diff-1',
      section: 'Course Outcome CO2 (Bloom’s Taxonomy L3 Action Verb)',
      original: 'Understand linear data structures and their basic operational algorithms.',
      corrected: 'Implement and verify abstract linear data representations including dynamic arrays, double-ended queues, and lock-free linked lists.',
      rationale: 'Replaces passive verb "Understand" with measurable performance verbs "Implement and verify" conforming to Anderson & Krathwohl Bloom’s taxonomy.',
      severity: 'High (Critical Defect Fix)'
    },
    {
      id: 'diff-2',
      section: 'Course Outcome CO4 (PO7 Sustainability Integration)',
      original: 'Learn graph traversal, minimum spanning trees, and shortest path algorithms.',
      corrected: 'Formulate and apply optimal network traversal, minimum spanning tree (Kruskal, Prim), and shortest path algorithms under energy-efficient computational limits.',
      rationale: 'Establishes direct measurable correlation with PO7 (Environment and Sustainability) via compute energy awareness in algorithmic complexity.',
      severity: 'Medium (Warning Resolution)'
    },
    {
      id: 'diff-3',
      section: 'Module 4: Hashing & Ethics (PO8 Alignment)',
      original: 'Direct address tables, hashing functions, linear probing.',
      corrected: 'Direct address tables; universal hashing; open addressing heuristics; hash data privacy leak analysis and ethical cryptographic implications.',
      rationale: 'Explicitly addresses Washington Accord PO8 (Professional Ethics) in data structure storage and hashing collisions.',
      severity: 'Advisory (Accreditation Value-Add)'
    }
  ];

  const toggleAccept = (id: string) => {
    setAcceptedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                REMEDIATION DIFF
              </span>
              <span className="text-xs text-[#554244]">Side-by-Side Audit Comparison</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
              Corrected Course Specification (Remediation Diff)
            </h1>
            <p className="text-xs text-[#554244] mt-1">
              Review and selectively endorse proposed accreditation modifications before submitting to the Board of Studies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAcceptAll}
              type="button"
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">done_all</span>
              <span>Accept All Recommended Corrections</span>
            </button>

            <button
              onClick={onAdvanceToWorkflow}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Submit to Governance Workflow</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 pt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-100 border border-red-300"></span>
            <span className="text-[#554244]">Original Draft (Deficient phrasing)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>
            <span className="text-[#554244]">Corrected Phrasing (NBA &amp; ABET Compliant)</span>
          </div>
        </div>
      </div>

      {/* Diff Cards */}
      <div className="space-y-4">
        {diffItems.map((item) => {
          const isAccepted = !!acceptedItems[item.id];
          return (
            <div key={item.id} className="bg-white border border-[#E7E3DC] rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F5F2EB]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-primary bg-[#FAF0F2] px-2 py-0.5 rounded border border-[#dbc0c2]">
                    {item.section}
                  </span>
                  <span className="text-[11px] text-[#554244]">{item.severity}</span>
                </div>

                <button
                  onClick={() => toggleAccept(item.id)}
                  type="button"
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                    isAccepted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-[#F5F2EB] text-[#554244] hover:bg-[#EAE5DA]'
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">
                    {isAccepted ? 'check_circle' : 'circle'}
                  </span>
                  <span>{isAccepted ? 'Accepted' : 'Click to Accept'}</span>
                </button>
              </div>

              {/* Side by side diff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Original */}
                <div className="p-3.5 rounded bg-red-50/60 border border-red-200 space-y-1">
                  <div className="font-bold text-red-900 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">remove_circle_outline</span>
                    Original Phrasing
                  </div>
                  <p className="line-through text-red-800 leading-relaxed font-mono text-[11px]">
                    {item.original}
                  </p>
                </div>

                {/* Corrected */}
                <div className="p-3.5 rounded bg-emerald-50/70 border border-emerald-200 space-y-1">
                  <div className="font-bold text-emerald-900 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    Remediated Phrasing
                  </div>
                  <p className="text-emerald-900 leading-relaxed font-mono text-[11px] font-semibold">
                    {item.corrected}
                  </p>
                </div>
              </div>

              {/* Rationale */}
              <div className="text-[11px] text-[#554244] pt-1">
                <strong>Auditor Rationale:</strong> {item.rationale}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
