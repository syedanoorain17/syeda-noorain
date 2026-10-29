import React, { useState } from 'react';

interface RawScreensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RawScreensModal: React.FC<RawScreensModalProps> = ({ isOpen, onClose }) => {
  const [selectedFolder, setSelectedFolder] = useState('specforge_syllabus_blueprint_upload_workspace');

  if (!isOpen) return null;

  const screens = [
    {
      id: 'specforge_syllabus_blueprint_upload_workspace',
      label: '1. Blueprint Ingestion Workspace',
      path: '/stitch_specforge_course_management_system/specforge_syllabus_blueprint_upload_workspace/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_syllabus_blueprint_upload_workspace/screen.png'
    },
    {
      id: 'specforge_course_specification_workspace',
      label: '2. Course Specification & Validation',
      path: '/stitch_specforge_course_management_system/specforge_course_specification_workspace/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_course_specification_workspace/screen.png'
    },
    {
      id: 'specforge_co_po_pso_alignment_matrix',
      label: '3. CO-PO-PSO Alignment Matrix',
      path: '/stitch_specforge_course_management_system/specforge_co_po_pso_alignment_matrix/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_co_po_pso_alignment_matrix/screen.png'
    },
    {
      id: 'specforge_compliance_defect_checks',
      label: '4. Compliance Defect Checks',
      path: '/stitch_specforge_course_management_system/specforge_compliance_defect_checks/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_compliance_defect_checks/screen.png'
    },
    {
      id: 'specforge_corrected_course_specification',
      label: '5. Corrected Specification Diff',
      path: '/stitch_specforge_course_management_system/specforge_corrected_course_specification/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_corrected_course_specification/screen.png'
    },
    {
      id: 'specforge_approval_governance_workflow',
      label: '6. Approval Governance Workflow',
      path: '/stitch_specforge_course_management_system/specforge_approval_governance_workflow/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_approval_governance_workflow/screen.png'
    },
    {
      id: 'specforge_export_accreditation_dossier',
      label: '7. Export Accreditation Dossier',
      path: '/stitch_specforge_course_management_system/specforge_export_accreditation_dossier/code.html',
      screen: '/stitch_specforge_course_management_system/specforge_export_accreditation_dossier/screen.png'
    }
  ];

  const current = screens.find((s) => s.id === selectedFolder) || screens[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-[#E7E3DC] rounded-xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E7E3DC] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">layers</span>
            <div>
              <h2 className="text-sm font-bold text-[#171c23]">
                Imported Raw Stitch Screen Prototypes
              </h2>
              <p className="text-[11px] text-[#554244]">
                Direct view of the 7 UI designs packaged in stitch_specforge_course_management_system.zip
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-[#887173] hover:text-[#171c23] hover:bg-gray-100"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Screen Picker Tabs */}
        <div className="flex overflow-x-auto gap-1 p-2 bg-[#F5F2EB] border-b border-[#E7E3DC] text-xs">
          {screens.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setSelectedFolder(screen.id)}
              className={`px-3 py-1.5 rounded text-left whitespace-nowrap font-medium transition-all ${
                selectedFolder === screen.id
                  ? 'bg-primary text-white shadow-xs font-bold'
                  : 'text-[#554244] hover:bg-white hover:text-[#171c23]'
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>

        {/* Preview Frame */}
        <div className="flex-1 overflow-hidden relative bg-[#FAF8F5]">
          <iframe
            src={current.path}
            title={current.label}
            className="w-full h-full border-none"
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-2.5 border-t border-[#E7E3DC] bg-white flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] text-[#554244] truncate">
            Path: {current.path}
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-primary text-white rounded text-xs font-semibold hover:bg-[#611527]"
          >
            Back to Interactive App
          </button>
        </div>
      </div>
    </div>
  );
};
