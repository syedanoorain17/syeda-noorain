import React, { useState, useEffect } from 'react';
import { CourseSpecification, Role, StageId } from './types';
import { INITIAL_COURSE_DATA } from './data/initialData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UploadStage } from './components/UploadStage';
import { SpecStage } from './components/SpecStage';
import { MatrixStage } from './components/MatrixStage';
import { ChecksStage } from './components/ChecksStage';
import { RemediationStage } from './components/RemediationStage';
import { WorkflowStage } from './components/WorkflowStage';
import { ExportStage } from './components/ExportStage';
import { GuidelinesModal } from './components/GuidelinesModal';
import { RawScreensModal } from './components/RawScreensModal';

export const App: React.FC = () => {
  const [course, setCourse] = useState<CourseSpecification>(() => {
    try {
      const saved = localStorage.getItem('specforge_course_data');
      return saved ? JSON.parse(saved) : INITIAL_COURSE_DATA;
    } catch {
      return INITIAL_COURSE_DATA;
    }
  });

  const [currentStage, setCurrentStage] = useState<StageId>('upload');
  const [currentRole, setCurrentRole] = useState<Role>('Author');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showRawModal, setShowRawModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('specforge_course_data', JSON.stringify(course));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [course]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCourse = (updated: Partial<CourseSpecification>) => {
    setCourse((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveDraft = () => {
    showToast('Course specification draft saved successfully.');
  };

  const handleSubmitReview = () => {
    if (currentRole === 'Author') {
      handleUpdateCourse({ status: 'Review Pending' });
      setCurrentStage('workflow');
      showToast('Specification submitted for Curriculum Auditor review.');
    } else if (currentRole === 'Reviewer') {
      handleUpdateCourse({ status: 'Approved' });
      setCurrentStage('workflow');
      showToast('Auditor recommendation endorsed.');
    } else {
      handleUpdateCourse({
        status: 'Accredited',
        bosCertificateHash: 'BOS-ENG-2024-CS302-' + Math.random().toString(36).substring(2, 7).toUpperCase()
      });
      setCurrentStage('export');
      showToast('Board of Studies accreditation seal affixed.');
    }
  };

  const unresolvedDefects = course.defects.filter((d) => !d.resolved).length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171c23] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        currentRole={currentRole}
        onRoleChange={(r) => {
          setCurrentRole(r);
          showToast(`Switched active view to ${r} mode.`);
        }}
        status={course.status}
        onSaveDraft={handleSaveDraft}
        onSubmitReview={handleSubmitReview}
        onOpenGuidelines={() => setShowGuidelines(true)}
        unresolvedDefectsCount={unresolvedDefects}
      />

      {/* Main Workspace: Sidebar + Document Stage */}
      <div className="flex flex-1 min-h-[calc(100vh-3.5rem)] relative">
        <Sidebar
          currentStage={currentStage}
          onSelectStage={setCurrentStage}
          course={course}
          onOpenGuidelines={() => setShowGuidelines(true)}
          onToggleRawModal={() => setShowRawModal(true)}
        />

        {/* Central Document Working Stage */}
        <main className="flex-1 overflow-y-auto custom-scrollbar pb-16">
          {currentStage === 'upload' && (
            <UploadStage
              course={course}
              onAdvanceToSpec={() => setCurrentStage('spec')}
              onUpdateCourse={handleUpdateCourse}
            />
          )}

          {currentStage === 'spec' && (
            <SpecStage
              course={course}
              onUpdateCourse={handleUpdateCourse}
              onAdvanceToMatrix={() => setCurrentStage('matrix')}
            />
          )}

          {currentStage === 'matrix' && (
            <MatrixStage
              course={course}
              onUpdateCourse={handleUpdateCourse}
              onAdvanceToChecks={() => setCurrentStage('checks')}
            />
          )}

          {currentStage === 'checks' && (
            <ChecksStage
              course={course}
              onUpdateCourse={handleUpdateCourse}
              onAdvanceToRemediation={() => setCurrentStage('remediation')}
              onAdvanceToWorkflow={() => setCurrentStage('workflow')}
            />
          )}

          {currentStage === 'remediation' && (
            <RemediationStage
              course={course}
              onAdvanceToWorkflow={() => setCurrentStage('workflow')}
              onAcceptAll={() => {
                const updatedDefects = course.defects.map((d) => ({ ...d, resolved: true }));
                const updatedMatrix = { ...course.alignmentMatrix };
                if (updatedMatrix['co-4']) updatedMatrix['co-4'] = { ...updatedMatrix['co-4'], PO7: 2 };
                if (updatedMatrix['co-5']) updatedMatrix['co-5'] = { ...updatedMatrix['co-5'], PO8: 2 };
                handleUpdateCourse({ defects: updatedDefects, alignmentMatrix: updatedMatrix });
                showToast('All recommended corrections accepted.');
              }}
            />
          )}

          {currentStage === 'workflow' && (
            <WorkflowStage
              course={course}
              currentRole={currentRole}
              onUpdateCourse={handleUpdateCourse}
              onAdvanceToExport={() => setCurrentStage('export')}
            />
          )}

          {currentStage === 'export' && (
            <ExportStage course={course} />
          )}
        </main>
      </div>

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#171c23] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-white/20 animate-fade-in">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modal Dialogs */}
      <GuidelinesModal isOpen={showGuidelines} onClose={() => setShowGuidelines(false)} />
      <RawScreensModal isOpen={showRawModal} onClose={() => setShowRawModal(false)} />
    </div>
  );
};

export default App;
