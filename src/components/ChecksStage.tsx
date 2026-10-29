import React, { useState } from 'react';
import { CourseSpecification, ComplianceDefect } from '../types';

interface ChecksStageProps {
  course: CourseSpecification;
  onUpdateCourse: (updated: Partial<CourseSpecification>) => void;
  onAdvanceToRemediation: () => void;
  onAdvanceToWorkflow: () => void;
}

export const ChecksStage: React.FC<ChecksStageProps> = ({
  course,
  onUpdateCourse,
  onAdvanceToRemediation,
  onAdvanceToWorkflow,
}) => {
  const [filter, setFilter] = useState<'All' | 'Critical' | 'Warning' | 'Advisory' | 'Resolved'>('All');

  const resolvedCount = course.defects.filter((d) => d.resolved).length;
  const criticalCount = course.defects.filter((d) => !d.resolved && d.severity === 'Critical').length;
  const warningCount = course.defects.filter((d) => !d.resolved && d.severity === 'Warning').length;
  const advisoryCount = course.defects.filter((d) => !d.resolved && d.severity === 'Advisory').length;

  const handleResolve = (defectId: string) => {
    const updated = course.defects.map((d) => {
      if (d.id === defectId) {
        return { ...d, resolved: true };
      }
      return d;
    });

    // Also if defect-2 (PO7) auto-fix:
    if (defectId === 'def-2') {
      const updatedMatrix = { ...course.alignmentMatrix };
      if (updatedMatrix['co-4']) {
        updatedMatrix['co-4'] = { ...updatedMatrix['co-4'], PO7: 2 };
      }
      onUpdateCourse({ defects: updated, alignmentMatrix: updatedMatrix });
      return;
    }

    // If defect-3 (PO8) auto-fix:
    if (defectId === 'def-3') {
      const updatedMatrix = { ...course.alignmentMatrix };
      if (updatedMatrix['co-5']) {
        updatedMatrix['co-5'] = { ...updatedMatrix['co-5'], PO8: 2 };
      }
      onUpdateCourse({ defects: updated, alignmentMatrix: updatedMatrix });
      return;
    }

    onUpdateCourse({ defects: updated });
  };

  const handleAutoFixAll = () => {
    const updated = course.defects.map((d) => ({ ...d, resolved: true }));
    const updatedMatrix = { ...course.alignmentMatrix };
    if (updatedMatrix['co-4']) updatedMatrix['co-4'] = { ...updatedMatrix['co-4'], PO7: 2 };
    if (updatedMatrix['co-5']) updatedMatrix['co-5'] = { ...updatedMatrix['co-5'], PO8: 2 };
    onUpdateCourse({ defects: updated, alignmentMatrix: updatedMatrix });
  };

  const filteredDefects = course.defects.filter((d) => {
    if (filter === 'Resolved') return d.resolved;
    if (filter === 'All') return true;
    return !d.resolved && d.severity === filter;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                STEP 4: ACCREDITATION AUDIT
              </span>
              <span className="text-xs text-[#554244]">Rule Engine &amp; Defect Checker</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
              Curriculum Compliance &amp; Taxonomy Verification
            </h1>
            <p className="text-xs text-[#554244] mt-1">
              Automated scan against NBA Tier-1, ABET EC2000, and Higher Education Quality Mandates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {warningCount + criticalCount > 0 ? (
              <button
                onClick={handleAutoFixAll}
                type="button"
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span>
                <span>Auto-Remediate All ({warningCount + criticalCount})</span>
              </button>
            ) : null}

            <button
              onClick={onAdvanceToRemediation}
              type="button"
              className="px-3.5 py-2 bg-white hover:bg-[#F5F2EB] text-[#171c23] border border-[#E7E3DC] rounded text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">difference</span>
              <span>View Remediation Diff</span>
            </button>

            <button
              onClick={onAdvanceToWorkflow}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Proceed to Governance Workflow</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Audit Stats Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[11px] text-[#554244]">Critical Blocks</div>
            <div className={`text-base font-bold mt-0.5 font-mono ${criticalCount > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
              {criticalCount} Issues
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[11px] text-[#554244]">Advisory Warnings</div>
            <div className={`text-base font-bold mt-0.5 font-mono ${warningCount > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
              {warningCount} Warnings
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[11px] text-[#554244]">Resolved / Compliant</div>
            <div className="text-base font-bold text-emerald-700 mt-0.5 font-mono">
              {resolvedCount} Passed
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[11px] text-[#554244]">Compliance Index</div>
            <div className="text-base font-bold text-primary mt-0.5 font-mono">
              {Math.round((resolvedCount / course.defects.length) * 100)}% Verified
            </div>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {(['All', 'Critical', 'Warning', 'Advisory', 'Resolved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            type="button"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === tab
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-[#E7E3DC] text-[#554244] hover:bg-[#F5F2EB]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Defect Cards List */}
      <div className="space-y-4">
        {filteredDefects.map((defect) => {
          const isResolved = defect.resolved;
          return (
            <div
              key={defect.id}
              className={`p-5 rounded-lg border transition-all ${
                isResolved
                  ? 'bg-white border-emerald-300'
                  : defect.severity === 'Critical'
                  ? 'bg-white border-red-300 ring-1 ring-red-200'
                  : defect.severity === 'Warning'
                  ? 'bg-white border-amber-300'
                  : 'bg-white border-[#E7E3DC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F5F2EB]">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                      isResolved
                        ? 'bg-emerald-100 text-emerald-800'
                        : defect.severity === 'Critical'
                        ? 'bg-red-100 text-red-800'
                        : defect.severity === 'Warning'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    {defect.code}
                  </span>
                  <h3 className="font-bold text-xs md:text-sm text-[#171c23]">{defect.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#554244] font-medium">Target: {defect.targetSection}</span>
                  {isResolved ? (
                    <span className="font-mono text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      RESOLVED
                    </span>
                  ) : (
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        defect.severity === 'Critical'
                          ? 'bg-red-50 text-red-800 border border-red-200'
                          : defect.severity === 'Warning'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {defect.severity}
                    </span>
                  )}
                </div>
              </div>

              <div className="py-3 text-xs text-[#171c23] space-y-2 leading-relaxed">
                <p>{defect.description}</p>
                <div className="p-3 bg-[#FAF8F5] border border-[#E7E3DC] rounded text-[#554244] text-[11px]">
                  <strong className="text-primary">Accreditation Recommendation:</strong> {defect.recommendation}
                </div>
              </div>

              {!isResolved && (
                <div className="pt-2 flex items-center justify-end gap-2">
                  {defect.autoFixAvailable && (
                    <button
                      onClick={() => handleResolve(defect.id)}
                      type="button"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                      <span>Apply Standard Remedy</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleResolve(defect.id)}
                    type="button"
                    className="px-3 py-1.5 bg-white border border-[#E7E3DC] hover:bg-[#F5F2EB] text-[#171c23] rounded text-xs font-semibold transition-colors"
                  >
                    Mark as Acknowledged
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
