import React from 'react';
import { StageId, CourseSpecification } from '../types';

interface SidebarProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  course: CourseSpecification;
  onOpenGuidelines: () => void;
  onToggleRawModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStage,
  onSelectStage,
  course,
  onOpenGuidelines,
  onToggleRawModal
}) => {
  const unresolvedDefects = course.defects.filter((d) => !d.resolved).length;

  const steps: { id: StageId; num: number; label: string; icon: string; subtitle: string }[] = [
    { id: 'upload', num: 1, label: 'Upload', icon: 'upload_file', subtitle: 'Blueprint ingestion' },
    { id: 'spec', num: 2, label: 'Spec', icon: 'assignment', subtitle: 'Core outcomes & modules' },
    { id: 'matrix', num: 3, label: 'CO-PO-PSO Map', icon: 'table_chart', subtitle: 'Outcome correlation' },
    { id: 'checks', num: 4, label: 'Checks', icon: 'fact_check', subtitle: 'Accreditation audit' },
    { id: 'remediation', num: 4.5 as any, label: 'Corrected Spec', icon: 'difference', subtitle: 'Remediation diff' },
    { id: 'workflow', num: 5, label: 'Workflow', icon: 'rule_folder', subtitle: 'Governance sign-off' },
    { id: 'export', num: 6, label: 'Export', icon: 'picture_as_pdf', subtitle: 'Accreditation dossier' }
  ];

  return (
    <aside className="w-[260px] bg-[#F5F2EB] border-r border-[#E7E3DC] flex flex-col justify-between shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 z-40 p-4 select-none overflow-y-auto custom-scrollbar">
      <div className="space-y-4">
        {/* Course Context Header Card */}
        <div className="p-3 bg-white rounded-lg border border-[#E7E3DC] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono tracking-wide text-primary bg-[#ffd9dd] px-2 py-0.5 rounded">
              {course.code}
            </span>
            <span className="text-[11px] font-mono text-[#554244] px-1.5 py-0.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded">
              L-T-P: {course.ltp.lecture}-{course.ltp.tutorial}-{course.ltp.practical}
            </span>
          </div>

          <h2 className="text-xs font-bold text-[#171c23] mt-2 line-clamp-1" title={course.title}>
            {course.title}
          </h2>

          <div className="mt-2 flex items-center justify-between text-[11px] text-[#554244] border-t border-[#F5F2EB] pt-1.5">
            <span>Credits: <strong>{course.credits.toFixed(1)}</strong></span>
            <span className="text-[#15803D] font-medium flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              NBA Tier-1
            </span>
          </div>
        </div>

        {/* Workflow Linear Stepper Navigation */}
        <div>
          <div className="text-[11px] font-semibold tracking-wider text-[#554244] uppercase px-1 mb-2">
            Workflow Stages
          </div>

          <nav aria-label="Course Spec Workflow Stepper" className="space-y-1">
            {steps.map((step) => {
              const isActive = currentStage === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelectStage(step.id)}
                  type="button"
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all ${
                    isActive
                      ? 'bg-white text-primary font-bold border-l-4 border-primary shadow-sm'
                      : 'text-[#554244] hover:bg-[#eae5da] hover:text-[#171c23]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] shrink-0 ${isActive ? 'text-primary' : 'text-[#887173]'}`}>
                    {step.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{step.label}</div>
                    <div className="text-[10px] text-[#554244] truncate opacity-75">{step.subtitle}</div>
                  </div>

                  {step.id === 'checks' && unresolvedDefects > 0 && (
                    <span className="font-mono text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-semibold border border-amber-300">
                      {unresolvedDefects}
                    </span>
                  )}
                  {isActive && (
                    <span className="font-mono text-[9px] px-1 py-0.5 bg-primary-fixed text-primary rounded font-bold">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Navigation Items */}
      <div className="pt-3 border-t border-[#E7E3DC] space-y-1">
        <button
          onClick={onOpenGuidelines}
          type="button"
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-[#554244] hover:text-[#171c23] hover:bg-[#eae5da] transition-colors text-left"
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span>Accreditation Guidelines</span>
        </button>

        <button
          onClick={onToggleRawModal}
          type="button"
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-primary font-semibold hover:bg-[#ffd9dd]/40 transition-colors text-left"
        >
          <span className="material-symbols-outlined text-base">layers</span>
          <span>Inspect Raw Stitch Screens</span>
        </button>

        <div className="text-[10px] font-mono text-[#887173] pt-1 px-2">
          SpecForge v2.4 • Higher Ed Edition
        </div>
      </div>
    </aside>
  );
};
