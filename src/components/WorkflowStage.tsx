import React, { useState } from 'react';
import { CourseSpecification, Role, WorkflowAction } from '../types';

interface WorkflowStageProps {
  course: CourseSpecification;
  currentRole: Role;
  onUpdateCourse: (updated: Partial<CourseSpecification>) => void;
  onAdvanceToExport: () => void;
}

export const WorkflowStage: React.FC<WorkflowStageProps> = ({
  course,
  currentRole,
  onUpdateCourse,
  onAdvanceToExport,
}) => {
  const [commentText, setCommentText] = useState('');

  const stagesList = [
    {
      num: 1,
      title: 'Course Author Submission',
      role: 'Author',
      actor: 'Dr. Aris Thorne (Faculty In-Charge)',
      status: 'Completed',
      date: 'Oct 18, 2024'
    },
    {
      num: 2,
      title: 'Curriculum Peer Audit',
      role: 'Reviewer',
      actor: 'Prof. Eleanor Vance (Senior Auditor)',
      status: course.status === 'Draft' ? 'Upcoming' : course.status === 'Review Pending' ? 'In Progress' : 'Completed',
      date: 'Oct 22, 2024'
    },
    {
      num: 3,
      title: 'Department Chair / HOD Endorsement',
      role: 'HOD',
      actor: 'Dr. K. S. Ramanujan (HOD, CompSci)',
      status: course.status === 'Approved' || course.status === 'Accredited' ? 'Completed' : 'Pending',
      date: course.status === 'Approved' ? 'Oct 29, 2024' : 'Awaiting Approval'
    },
    {
      num: 4,
      title: 'Board of Studies (BOS) Final Accreditation',
      role: 'BOS Council',
      actor: 'Academic Council Board of Studies',
      status: course.status === 'Accredited' ? 'Completed' : course.status === 'Approved' ? 'Ready for Docket' : 'Upcoming',
      date: 'AY 2024–25 Register'
    }
  ];

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newAction: WorkflowAction = {
      id: `wf-${Date.now()}`,
      role: currentRole,
      actorName:
        currentRole === 'Author'
          ? 'Dr. Aris Thorne'
          : currentRole === 'Reviewer'
          ? 'Prof. Eleanor Vance'
          : 'Dr. K. S. Ramanujan',
      action: 'Reviewed',
      timestamp: new Date().toLocaleString(),
      comment: commentText,
      statusAfter: course.status
    };

    onUpdateCourse({
      workflowHistory: [...course.workflowHistory, newAction]
    });
    setCommentText('');
  };

  const handleRoleAction = (actionType: 'approve' | 'request_revision' | 'hod_endorse') => {
    let newStatus = course.status;
    let actionLabel: WorkflowAction['action'] = 'Reviewed';
    let comment = commentText || 'Verdict submitted in governance workflow.';

    if (actionType === 'approve') {
      newStatus = 'Approved';
      actionLabel = 'Approved';
    } else if (actionType === 'request_revision') {
      newStatus = 'Needs Revision';
      actionLabel = 'Revision Requested';
    } else if (actionType === 'hod_endorse') {
      newStatus = 'Accredited';
      actionLabel = 'Endorsed';
      comment = 'Formally sealed and stamped with BOS accreditation certificate hash.';
    }

    const newAction: WorkflowAction = {
      id: `wf-${Date.now()}`,
      role: currentRole,
      actorName:
        currentRole === 'Author'
          ? 'Dr. Aris Thorne'
          : currentRole === 'Reviewer'
          ? 'Prof. Eleanor Vance'
          : 'Dr. K. S. Ramanujan (HOD)',
      action: actionLabel,
      timestamp: new Date().toLocaleString(),
      comment,
      statusAfter: newStatus
    };

    onUpdateCourse({
      status: newStatus,
      workflowHistory: [...course.workflowHistory, newAction],
      bosCertificateHash: course.bosCertificateHash || 'BOS-CERT-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    });

    setCommentText('');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                STEP 5: GOVERNANCE WORKFLOW
              </span>
              <span className="text-xs text-[#554244]">Multi-tier Sign-off &amp; Audit Trail</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
              Curriculum Approval Pipeline &amp; Sign-off Register
            </h1>
            <p className="text-xs text-[#554244] mt-1">
              Active Role: <strong className="text-primary">{currentRole}</strong> • Switch roles in the top bar to simulate author, reviewer, or HOD permissions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAdvanceToExport}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Proceed to Accreditation Dossier Export</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
          {stagesList.map((st) => (
            <div
              key={st.num}
              className={`p-3.5 rounded-lg border ${
                st.status === 'Completed'
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : st.status === 'In Progress'
                  ? 'bg-[#FAF0F2] border-primary ring-1 ring-primary'
                  : 'bg-[#FAF8F5] border-[#E7E3DC]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[11px] font-bold text-[#554244]">Stage 0{st.num}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    st.status === 'Completed'
                      ? 'bg-emerald-200 text-emerald-900'
                      : st.status === 'In Progress'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {st.status}
                </span>
              </div>
              <h4 className="font-bold text-[#171c23] leading-snug">{st.title}</h4>
              <p className="text-[11px] text-[#554244] mt-1 truncate">{st.actor}</p>
              <div className="text-[10px] text-[#887173] mt-2 font-mono">{st.date}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Role Action Controls & Decision Pane */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E7E3DC] rounded-lg p-5 space-y-4 shadow-sm">
            <div className="pb-3 border-b border-[#E7E3DC]">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#554244]">
                  Action Controls for: {currentRole}
                </h3>
                <span className="font-mono text-[11px] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E7E3DC] text-primary font-bold">
                  Status: {course.status}
                </span>
              </div>
            </div>

            {/* Role specific action buttons */}
            <div className="space-y-3">
              {currentRole === 'Reviewer' && (
                <div className="space-y-2">
                  <p className="text-xs text-[#554244]">
                    As Senior Curriculum Auditor, evaluate whether learning outcomes and credit distributions comply with accreditation thresholds.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleRoleAction('approve')}
                      type="button"
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-xs">thumb_up</span>
                      <span>Approve Spec</span>
                    </button>
                    <button
                      onClick={() => handleRoleAction('request_revision')}
                      type="button"
                      className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-xs">edit_note</span>
                      <span>Request Revision</span>
                    </button>
                  </div>
                </div>
              )}

              {currentRole === 'HOD' && (
                <div className="space-y-2">
                  <p className="text-xs text-[#554244]">
                    As Head of Department, apply formal institutional endorsement to affix the Board of Studies (BOS) accreditation cryptographic seal.
                  </p>
                  <button
                    onClick={() => handleRoleAction('hod_endorse')}
                    type="button"
                    className="w-full px-4 py-2.5 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Affix BOS Endorsement Stamp</span>
                  </button>
                </div>
              )}

              {currentRole === 'Author' && (
                <div className="space-y-2">
                  <p className="text-xs text-[#554244]">
                    Faculty Course Author: Update draft or submit revisions for the curriculum review board.
                  </p>
                  <button
                    onClick={() => {
                      onUpdateCourse({ status: 'Review Pending' });
                      handleAddComment();
                    }}
                    type="button"
                    className="w-full px-4 py-2.5 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Submit Specification to Reviewers</span>
                  </button>
                </div>
              )}
            </div>

            {/* Comment Box */}
            <div className="pt-3 border-t border-[#E7E3DC] space-y-2">
              <label className="block text-xs font-bold text-[#171c23]">
                Add Governance Note / Review Remark
              </label>
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={`Enter official commentary as ${currentRole}...`}
                className="w-full text-xs p-2.5 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary outline-none"
              />
              <button
                onClick={handleAddComment}
                type="button"
                className="w-full py-1.5 px-3 bg-white border border-[#E7E3DC] hover:bg-[#F5F2EB] text-[#171c23] rounded text-xs font-semibold transition-colors"
              >
                Post Remark to Audit Trail
              </button>
            </div>
          </div>

          {/* BOS Seal info card if approved */}
          {course.bosCertificateHash && (
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <span className="material-symbols-outlined text-base">verified_user</span>
                BOS Accreditation Certificate Hash
              </div>
              <div className="font-mono text-[11px] bg-white p-2 rounded border border-emerald-200 text-emerald-800 break-all">
                {course.bosCertificateHash}
              </div>
              <p className="text-[11px] text-emerald-900">
                Validated against Washington Accord Tier-1 Academic Council Ordinance 2024-B.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Historical Audit Trail Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-[#E7E3DC] rounded-lg p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#554244] pb-2 border-b border-[#E7E3DC]">
              Official Audit Trail &amp; Governance Thread ({course.workflowHistory.length} Events)
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E7E3DC]">
              {course.workflowHistory.map((item) => (
                <div key={item.id} className="relative pl-8 text-xs">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary-container text-white border-2 border-white"></div>

                  <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E7E3DC] space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-[#171c23] flex items-center gap-1.5">
                        <span>{item.actorName}</span>
                        <span className="font-mono text-[10px] bg-[#ffd9dd] text-primary px-1.5 py-0.2 rounded font-semibold">
                          {item.role}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#887173]">{item.timestamp}</span>
                    </div>

                    <div className="font-medium text-primary text-[11px]">
                      Action: {item.action} • Resulting Status: {item.statusAfter}
                    </div>

                    {item.comment && (
                      <p className="text-[#554244] pt-1 text-[11px] leading-relaxed border-t border-[#E7E3DC] mt-1">
                        "{item.comment}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
