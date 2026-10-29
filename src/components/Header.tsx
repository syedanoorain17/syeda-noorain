import React, { useState } from 'react';
import { Role, CourseStatus } from '../types';

interface HeaderProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  status: CourseStatus;
  onSaveDraft: () => void;
  onSubmitReview: () => void;
  onOpenGuidelines: () => void;
  unresolvedDefectsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  status,
  onSaveDraft,
  onSubmitReview,
  onOpenGuidelines,
  unresolvedDefectsCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const roleUserMap: Record<Role, { name: string; dept: string; initials: string }> = {
    Author: { name: 'Dr. Aris Thorne', dept: 'Assoc. Prof, CSE', initials: 'AT' },
    Reviewer: { name: 'Prof. Eleanor Vance', dept: 'Curriculum Auditor', initials: 'EV' },
    HOD: { name: 'Dr. K. S. Ramanujan', dept: 'Head of Department', initials: 'KR' }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-300 bg-gray-50 text-gray-700 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            Draft
          </span>
        );
      case 'Review Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-blue-200 bg-blue-50 text-blue-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Review Pending
          </span>
        );
      case 'Needs Revision':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-amber-300 bg-amber-50 text-amber-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Needs Revision ({unresolvedDefectsCount} Warnings)
          </span>
        );
      case 'Approved':
      case 'Accredited':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            Accredited / Met
          </span>
        );
      default:
        return null;
    }
  };

  const getActionBtnText = () => {
    if (currentRole === 'Author') {
      return status === 'Review Pending' ? 'Submitted' : 'Submit for Review';
    }
    if (currentRole === 'Reviewer') {
      return 'Submit Audit Verdict';
    }
    return 'Endorse & Sign BOS';
  };

  return (
    <header className="flex justify-between items-center w-full px-4 md:px-6 h-14 sticky top-0 z-50 bg-white border-b border-[#E7E3DC]">
      {/* Left brand & context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary tracking-tight">SpecForge</span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#F5F2EB] border border-[#E7E3DC] text-[#554244] font-medium">
            AY 2024–25
          </span>
        </div>

        <div className="h-4 w-[1px] bg-[#E7E3DC] hidden sm:block"></div>

        {/* Role Switcher Segmented Control */}
        <nav aria-label="Role Switcher" className="inline-flex items-center bg-[#F5F2EB] p-0.5 rounded-full border border-[#E7E3DC]">
          {(['Author', 'Reviewer', 'HOD'] as Role[]).map((role) => {
            const isActive = currentRole === role;
            return (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-white text-primary shadow-sm border border-[#E7E3DC] font-semibold'
                    : 'text-[#554244] hover:text-[#171c23]'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>}
                {role}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Center status pill */}
      <div className="hidden lg:flex items-center">
        {getStatusBadge()}
      </div>

      {/* Right Actions & User Profile */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onSaveDraft}
            type="button"
            className="px-3 py-1.5 bg-white hover:bg-[#F5F2EB] text-[#171c23] border border-[#E7E3DC] rounded text-xs font-semibold transition-colors duration-150"
          >
            Save Draft
          </button>
          <button
            onClick={onSubmitReview}
            type="button"
            className="px-3.5 py-1.5 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors duration-150 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {currentRole === 'HOD' ? 'verified' : 'send'}
            </span>
            <span>{getActionBtnText()}</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-[#E7E3DC] mx-0.5"></div>

        {/* Notification & Help Icon Buttons */}
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-[#554244] hover:text-[#171c23] hover:bg-[#F5F2EB] rounded transition-colors relative"
            title="Notifications"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unresolvedDefectsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-white"></span>
            )}
          </button>

          <button
            onClick={onOpenGuidelines}
            className="p-1.5 text-[#554244] hover:text-[#171c23] hover:bg-[#F5F2EB] rounded transition-colors"
            title="Accreditation Guidelines & Help"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-white border border-[#E7E3DC] rounded-lg shadow-lg p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E3DC] mb-2 font-semibold text-[#171c23]">
                <span>Audit & Governance Alerts</span>
                <span className="text-[10px] text-[#554244]">{unresolvedDefectsCount} unread</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-900">
                  <div className="font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">warning</span>
                    PO7 Under-mapped Warning
                  </div>
                  <p className="text-[11px] mt-0.5">Environment & Sustainability requires green computing / energy heuristic alignment.</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border border-blue-200 text-blue-900">
                  <div className="font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">info</span>
                    Syllabus Auto-parsed
                  </div>
                  <p className="text-[11px] mt-0.5">CS302 Blueprint verified with 5 modules and 5 Course Outcomes.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-[#E7E3DC]">
          <div
            className="w-8 h-8 rounded-full bg-[#ffd9dd] text-primary flex items-center justify-center font-bold text-xs border border-[#dbc0c2]"
            title={roleUserMap[currentRole].name}
          >
            {roleUserMap[currentRole].initials}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold leading-tight text-[#171c23]">
              {roleUserMap[currentRole].name}
            </span>
            <span className="text-[10px] font-mono text-[#554244]">
              {roleUserMap[currentRole].dept}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
