import React, { useState } from 'react';
import { CourseSpecification } from '../types';

interface UploadStageProps {
  course: CourseSpecification;
  onAdvanceToSpec: () => void;
  onUpdateCourse: (updated: Partial<CourseSpecification>) => void;
}

export const UploadStage: React.FC<UploadStageProps> = ({
  course,
  onAdvanceToSpec,
  onUpdateCourse,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('cs302');
  const [parsingProgress, setParsingProgress] = useState(100);
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = [
    {
      id: 'cs302',
      name: 'CS302: Data Structures & Algorithms (Current)',
      desc: 'B.Tech Core • 4.0 Credits • 5 Modules • 5 Course Outcomes',
      code: 'CS302',
      title: 'Data Structures & Algorithms'
    },
    {
      id: 'cs401',
      name: 'CS401: Machine Learning & Statistical Inference',
      desc: 'B.Tech Elective • 3.0 Credits • 4 Modules • 4 Course Outcomes',
      code: 'CS401',
      title: 'Machine Learning & Statistical Inference'
    },
    {
      id: 'cs204',
      name: 'CS204: Database Management Systems & Relational Theory',
      desc: 'B.Tech Core • 4.0 Credits • 5 Modules • 5 Course Outcomes',
      code: 'CS204',
      title: 'Database Management Systems & Relational Theory'
    }
  ];

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setParsingProgress(25);
    setTimeout(() => setParsingProgress(60), 400);
    setTimeout(() => {
      setParsingProgress(100);
      setIsProcessing(false);
      onAdvanceToSpec();
    }, 900);
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    const chosen = presets.find((p) => p.id === presetId);
    if (chosen) {
      onUpdateCourse({
        code: chosen.code,
        title: chosen.title
      });
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-6 py-8 space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                INGESTION WORKSPACE
              </span>
              <span className="text-xs text-[#554244]">Step 1 of 6</span>
            </div>
            <h1 className="text-2xl font-bold text-[#171c23] tracking-tight">
              Syllabus Blueprint & Document Ingestion
            </h1>
            <p className="text-sm text-[#554244] mt-1">
              Upload existing departmental syllabus PDFs, Word documents, or select from curated accreditation templates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateUpload}
              disabled={isProcessing}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isProcessing ? 'hourglass_top' : 'auto_awesome'}
              </span>
              <span>{isProcessing ? `Parsing (${parsingProgress}%)...` : 'Parse & Open Specification'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Dropzone & Raw Text Ingestion */}
        <div className="lg:col-span-7 space-y-6">
          {/* File Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleSimulateUpload(); }}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive ? 'border-primary bg-[#FAF0F2]' : 'border-[#dbc0c2] bg-white hover:border-primary/60'
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F5F2EB] flex items-center justify-center text-primary mb-3">
              <span className="material-symbols-outlined text-[32px]">upload_file</span>
            </div>

            <h3 className="text-base font-bold text-[#171c23]">
              Drag and drop syllabus blueprint files here
            </h3>
            <p className="text-xs text-[#554244] max-w-md mx-auto mt-1 mb-4">
              Supported formats: .pdf, .docx, .txt, .json. Extraction extracts course codes, outcomes, contact hours, and textbooks automatically.
            </p>

            <div className="flex items-center justify-center gap-3">
              <label className="cursor-pointer px-4 py-2 bg-white border border-[#E7E3DC] text-[#171c23] rounded text-xs font-semibold hover:bg-[#F5F2EB] shadow-xs">
                Browse Local Files
                <input
                  type="file"
                  className="hidden"
                  onChange={() => handleSimulateUpload()}
                  accept=".pdf,.docx,.txt"
                />
              </label>

              <button
                onClick={handleSimulateUpload}
                type="button"
                className="px-4 py-2 bg-primary-container text-white rounded text-xs font-semibold hover:bg-[#611527]"
              >
                Use Sample Syllabus
              </button>
            </div>
          </div>

          {/* Quick Preset Selector */}
          <div className="bg-white border border-[#E7E3DC] rounded-lg p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#554244] mb-3">
              Curriculum Blueprint Presets
            </h4>
            <div className="space-y-2">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start justify-between ${
                    selectedPreset === preset.id
                      ? 'border-primary bg-[#FAF0F2]/70 ring-1 ring-primary'
                      : 'border-[#E7E3DC] hover:border-[#887173] bg-[#FAF8F5]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#171c23] flex items-center gap-2">
                      <span>{preset.name}</span>
                      {selectedPreset === preset.id && (
                        <span className="font-mono text-[9px] bg-primary text-white px-1.5 py-0.2 rounded font-bold">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#554244] mt-0.5">{preset.desc}</p>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {selectedPreset === preset.id ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Parser Intelligence & Extracted Meta Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E7E3DC] rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E3DC]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-xs font-bold text-[#171c23]">Parser Engine Ready</span>
              </div>
              <span className="font-mono text-[11px] text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                98.4% Confidence
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-[#F5F2EB]">
                <span className="text-[#554244]">Detected Course:</span>
                <span className="font-bold text-[#171c23]">{course.code} - {course.title}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F5F2EB]">
                <span className="text-[#554244]">Target Degree & Sem:</span>
                <span className="font-semibold text-[#171c23]">{course.degree} • {course.semester}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F5F2EB]">
                <span className="text-[#554244]">Credit Allocation:</span>
                <span className="font-mono font-bold text-primary">{course.credits.toFixed(1)} Credits (L-T-P: 3-1-0)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F5F2EB]">
                <span className="text-[#554244]">Course Outcomes:</span>
                <span className="font-semibold text-[#15803D]">5 Outcomes Identified</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F5F2EB]">
                <span className="text-[#554244]">Syllabus Units:</span>
                <span className="font-semibold text-[#171c23]">5 Modular Units (60 Total Hours)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#554244]">Accreditation Tag:</span>
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  NBA Tier-1 / ABET Compliant
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onAdvanceToSpec}
                type="button"
                className="w-full py-2.5 px-3 bg-primary-container hover:bg-[#611527] text-white text-xs font-semibold rounded shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Proceed to Course Specification Workbench</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="bg-[#F5F2EB] border border-[#dbc0c2] rounded-lg p-4 text-xs text-[#554244] space-y-2">
            <div className="font-bold text-[#171c23] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">verified</span>
              Accreditation Protocol Notice
            </div>
            <p className="text-[11px] leading-relaxed">
              Every course outcome statement must begin with a measurable action verb referencing revised Bloom’s taxonomy (Anderson &amp; Krathwohl). Passive terms such as "Know", "Understand", or "Learn" will automatically trigger validation defects in Step 4.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
