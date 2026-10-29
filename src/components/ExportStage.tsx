import React, { useState } from 'react';
import { CourseSpecification } from '../types';
import { PO_LIST, PSO_LIST } from '../data/initialData';

interface ExportStageProps {
  course: CourseSpecification;
}

export const ExportStage: React.FC<ExportStageProps> = ({ course }) => {
  const [format, setFormat] = useState<'nba' | 'abet' | 'handbook' | 'json'>('nba');
  const [copied, setCopied] = useState(false);

  const columns = [...PO_LIST, ...PSO_LIST];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(course, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${course.code}_Accreditation_Dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const generateMarkdown = () => {
    return `# ${course.code}: ${course.title}
**Department:** ${course.department}
**Academic Year:** ${course.academicYear} | **Level:** ${course.degree} | **Semester:** ${course.semester}
**Credits:** ${course.credits} (L-T-P: ${course.ltp.lecture}-${course.ltp.tutorial}-${course.ltp.practical}) | **Total Hours:** ${course.totalHours}
**BOS Certificate Hash:** ${course.bosCertificateHash || 'N/A'}

## Course Description
${course.description}

**Prerequisites:** ${course.prerequisites}

## Course Outcomes (COs)
${course.outcomes.map((co) => `- **${co.code}** (${co.bloomsLevel}, ${co.contactHours} hrs): ${co.statement}`).join('\n')}

## Syllabus Units
${course.modules.map((m) => `### Unit ${m.unitNumber}: ${m.title} (${m.lectureHours}L + ${m.tutorialHours}T hrs)
${m.topics}
*References:* ${m.textbookRefs}`).join('\n\n')}

## Governance Sign-offs
${course.workflowHistory.map((h) => `- **${h.role}** (${h.actorName}) - ${h.action} on ${h.timestamp}`).join('\n')}
`;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${course.code}_Syllabus_Dossier.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                STEP 6: ACCREDITATION DOSSIER
              </span>
              <span className="text-xs text-[#554244]">Self-Assessment Report Generator</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
              Export Accreditation Dossier
            </h1>
            <p className="text-xs text-[#554244] mt-1">
              Generate standardized curriculum exhibits for NBA (Tier-1/2), ABET Criterion 3, and internal BOS dockets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-3.5 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadMarkdown}
              type="button"
              className="px-3.5 py-2 bg-white hover:bg-[#F5F2EB] text-[#171c23] border border-[#E7E3DC] rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Markdown</span>
            </button>

            <button
              onClick={handleDownloadJson}
              type="button"
              className="px-3.5 py-2 bg-white hover:bg-[#F5F2EB] text-[#171c23] border border-[#E7E3DC] rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">data_object</span>
              <span>Download JSON</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              type="button"
              className="px-3 py-2 bg-white hover:bg-[#F5F2EB] text-[#171c23] border border-[#E7E3DC] rounded text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-3 pt-3 text-xs">
          <span className="text-[#554244] font-semibold">Dossier Exhibition Format:</span>
          {[
            { id: 'nba', label: 'NBA SAR Format' },
            { id: 'abet', label: 'ABET Syllabus Format' },
            { id: 'handbook', label: 'University Handbook' },
            { id: 'json', label: 'Raw JSON Exhibit' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFormat(f.id as any)}
              type="button"
              className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                format === f.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-[#FAF8F5] border border-[#E7E3DC] text-[#554244] hover:bg-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Printable Official Dossier View */}
      {format !== 'json' ? (
        <div className="bg-white border border-[#E7E3DC] rounded-lg p-8 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
          {/* Institutional Header */}
          <div className="text-center pb-6 border-b-2 border-primary space-y-1">
            <div className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
            </div>
            <h2 className="text-xl font-bold text-[#171c23] tracking-tight uppercase">
              Official Course Specification &amp; Accreditation Dossier
            </h2>
            <div className="text-xs text-[#554244]">
              Accreditation Standard: {format === 'nba' ? 'National Board of Accreditation (NBA) SAR Exhibit' : format === 'abet' ? 'ABET EAC Criterion 3 & 5' : 'Board of Studies Academic Handbook'} • {course.academicYear}
            </div>
          </div>

          {/* Section 1: Course Summary */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-[#E7E3DC] pb-1">
              1. General Course Identification
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded">
                <span className="text-[#554244] text-[10px] block">Course Code &amp; Title</span>
                <span className="font-bold font-mono text-primary text-sm">{course.code}</span>
                <span className="font-semibold block text-[#171c23]">{course.title}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded">
                <span className="text-[#554244] text-[10px] block">Credit Distribution</span>
                <span className="font-bold text-sm">{course.credits} Credits</span>
                <span className="font-mono text-[#554244] block">L-T-P: {course.ltp.lecture}-{course.ltp.tutorial}-{course.ltp.practical} (60 Hrs)</span>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded">
                <span className="text-[#554244] text-[10px] block">Program &amp; Semester</span>
                <span className="font-bold">{course.degree}</span>
                <span className="text-[#554244] block">{course.semester}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] border border-[#E7E3DC] rounded">
                <span className="text-[#554244] text-[10px] block">Accreditation Seal</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  NBA Tier-1 Endorsed
                </span>
                <span className="font-mono text-[9px] text-[#554244] block truncate">{course.bosCertificateHash}</span>
              </div>
            </div>

            <div className="text-xs text-[#171c23] leading-relaxed pt-1">
              <strong>Course Scope &amp; Objective:</strong> {course.description}
            </div>
            <div className="text-xs text-[#554244]">
              <strong>Prerequisites:</strong> {course.prerequisites}
            </div>
          </div>

          {/* Section 2: Course Outcomes */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-[#E7E3DC] pb-1">
              2. Course Outcomes (CO) &amp; Cognitive Bloom Levels
            </h3>
            <table className="w-full text-xs border border-[#E7E3DC]">
              <thead className="bg-[#F5F2EB] text-[#171c23]">
                <tr>
                  <th className="p-2 border border-[#E7E3DC] w-14 text-center">Code</th>
                  <th className="p-2 border border-[#E7E3DC]">Outcome Statement</th>
                  <th className="p-2 border border-[#E7E3DC] w-28 text-center">Bloom's Level</th>
                  <th className="p-2 border border-[#E7E3DC] w-16 text-center">Hours</th>
                  <th className="p-2 border border-[#E7E3DC] w-20 text-center">Weight</th>
                </tr>
              </thead>
              <tbody>
                {course.outcomes.map((co) => (
                  <tr key={co.id} className="border-b border-[#E7E3DC]">
                    <td className="p-2 border border-[#E7E3DC] text-center font-mono font-bold text-primary">{co.code}</td>
                    <td className="p-2 border border-[#E7E3DC] text-[#171c23] leading-relaxed">{co.statement}</td>
                    <td className="p-2 border border-[#E7E3DC] text-center font-medium">{co.bloomsLevel}</td>
                    <td className="p-2 border border-[#E7E3DC] text-center font-mono">{co.contactHours} hrs</td>
                    <td className="p-2 border border-[#E7E3DC] text-center font-mono">{co.cieWeight}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 3: CO-PO Matrix Summary */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-[#E7E3DC] pb-1">
              3. Outcome Articulation Matrix (NBA SAR Criterion 3.1)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-[#E7E3DC] text-center">
                <thead className="bg-[#F5F2EB]">
                  <tr>
                    <th className="p-1.5 border border-[#E7E3DC] font-bold text-left min-w-[70px]">CO</th>
                    {columns.map((c) => (
                      <th key={c.key} className="p-1 border border-[#E7E3DC] font-mono font-bold text-[10px]">
                        {c.key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {course.outcomes.map((co) => (
                    <tr key={co.id}>
                      <td className="p-1.5 border border-[#E7E3DC] font-bold font-mono text-left text-primary">{co.code}</td>
                      {columns.map((c) => {
                        const val = course.alignmentMatrix[co.id]?.[c.key] || 0;
                        return (
                          <td key={c.key} className="p-1 border border-[#E7E3DC] font-mono text-[10px]">
                            {val === 0 ? '-' : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Syllabus Modules */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-primary border-b border-[#E7E3DC] pb-1">
              4. Modular Syllabus Breakdown
            </h3>
            <div className="space-y-3 text-xs">
              {course.modules.map((m) => (
                <div key={m.id} className="p-3 bg-[#FAF8F5] border border-[#E7E3DC] rounded space-y-1">
                  <div className="flex justify-between items-center font-bold text-[#171c23]">
                    <span>Unit {m.unitNumber}: {m.title}</span>
                    <span className="font-mono text-primary font-semibold">{m.lectureHours}L + {m.tutorialHours}T hrs</span>
                  </div>
                  <p className="text-[#554244] leading-relaxed">{m.topics}</p>
                  <div className="text-[11px] text-[#887173]">
                    <em>Textbook references:</em> {m.textbookRefs}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Institutional Sign-off Signatures */}
          <div className="pt-6 border-t-2 border-[#E7E3DC]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#554244] mb-4">
              5. Official Institutional Governance Signatures
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-center">
              <div className="p-4 border border-[#E7E3DC] rounded bg-[#FAF8F5] space-y-2">
                <div className="h-10 flex items-center justify-center font-serif italic text-primary text-base">
                  Dr. Aris Thorne
                </div>
                <div className="border-t border-[#dbc0c2] pt-2">
                  <div className="font-bold text-[#171c23]">Course Coordinator / Author</div>
                  <div className="text-[10px] text-[#554244]">Dept. of Computer Science &amp; Engineering</div>
                  <div className="font-mono text-[9px] text-[#887173] mt-1">Signed: 2024-10-18 16:15</div>
                </div>
              </div>

              <div className="p-4 border border-[#E7E3DC] rounded bg-[#FAF8F5] space-y-2">
                <div className="h-10 flex items-center justify-center font-serif italic text-primary text-base">
                  Prof. Eleanor Vance
                </div>
                <div className="border-t border-[#dbc0c2] pt-2">
                  <div className="font-bold text-[#171c23]">Senior Curriculum Auditor</div>
                  <div className="text-[10px] text-[#554244]">Accreditation Peer Review Board</div>
                  <div className="font-mono text-[9px] text-[#887173] mt-1">Signed: 2024-10-22 11:20</div>
                </div>
              </div>

              <div className="p-4 border border-emerald-300 rounded bg-emerald-50/50 space-y-2">
                <div className="h-10 flex items-center justify-center font-serif italic text-emerald-800 text-base font-bold">
                  Dr. K. S. Ramanujan
                </div>
                <div className="border-t border-emerald-300 pt-2">
                  <div className="font-bold text-emerald-950">Head of Department (HOD)</div>
                  <div className="text-[10px] text-emerald-800">Board of Studies Chairman</div>
                  <div className="font-mono text-[9px] text-emerald-700 mt-1">Seal: {course.bosCertificateHash}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Raw JSON Viewer */
        <div className="bg-white border border-[#E7E3DC] rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-mono text-xs font-bold text-[#554244]">Raw Accreditation JSON Payload</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(course, null, 2));
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs text-primary font-bold hover:underline"
            >
              {copied ? 'Copied to clipboard!' : 'Copy JSON'}
            </button>
          </div>
          <pre className="bg-[#FAF8F5] p-4 rounded border border-[#E7E3DC] text-[11px] font-mono text-[#171c23] overflow-x-auto max-h-[600px] custom-scrollbar">
            {JSON.stringify(course, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
