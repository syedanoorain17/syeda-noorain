import React, { useState } from 'react';
import { CourseSpecification } from '../types';
import { PO_LIST, PSO_LIST } from '../data/initialData';

interface MatrixStageProps {
  course: CourseSpecification;
  onUpdateCourse: (updated: Partial<CourseSpecification>) => void;
  onAdvanceToChecks: () => void;
}

export const MatrixStage: React.FC<MatrixStageProps> = ({
  course,
  onUpdateCourse,
  onAdvanceToChecks,
}) => {
  const [selectedCell, setSelectedCell] = useState<{ coId: string; colKey: string } | null>(null);

  const columns = [...PO_LIST, ...PSO_LIST];

  const handleCellClick = (coId: string, colKey: string) => {
    const currentVal = course.alignmentMatrix[coId]?.[colKey] ?? 0;
    // Cycle 0 -> 1 -> 2 -> 3 -> 0
    const nextVal = (currentVal + 1) % 4;

    const updatedMatrix = {
      ...course.alignmentMatrix,
      [coId]: {
        ...(course.alignmentMatrix[coId] || {}),
        [colKey]: nextVal
      }
    };

    onUpdateCourse({ alignmentMatrix: updatedMatrix });
  };

  // Compute column averages
  const columnAverages: Record<string, { avg: number; count: number }> = {};
  columns.forEach((col) => {
    let total = 0;
    let mappedCount = 0;
    course.outcomes.forEach((co) => {
      const val = course.alignmentMatrix[co.id]?.[col.key] || 0;
      if (val > 0) {
        total += val;
        mappedCount += 1;
      }
    });
    columnAverages[col.key] = {
      avg: mappedCount > 0 ? parseFloat((total / mappedCount).toFixed(2)) : 0,
      count: mappedCount
    };
  });

  const getCellColor = (val: number) => {
    switch (val) {
      case 3:
        return 'bg-[#781d32] text-white font-bold';
      case 2:
        return 'bg-[#fe798f]/40 text-[#740c2a] font-semibold';
      case 1:
        return 'bg-[#FAF0F2] text-primary font-medium';
      default:
        return 'bg-white text-gray-300 hover:text-gray-500';
    }
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 md:px-6 py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2 py-0.5 rounded border border-[#dbc0c2]">
                STEP 3: ALIGNMENT MATRIX
              </span>
              <span className="text-xs text-[#554244]">CO-PO-PSO Articulation Table</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
              Course Outcome to Program Outcome Mapping
            </h1>
            <p className="text-xs text-[#554244] mt-1">
              Click cells to toggle correlation: <strong>0 (No mapping)</strong> → <strong>1 (Slight)</strong> → <strong>2 (Moderate)</strong> → <strong>3 (Substantial)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onAdvanceToChecks}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Run Accreditation Defect Checks</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 pt-3 text-xs">
          <span className="text-[#554244] font-semibold">Scale Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded border border-[#E7E3DC] bg-white text-gray-400 flex items-center justify-center font-mono text-[11px]">-</span>
            <span>0: None</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-[#FAF0F2] text-primary flex items-center justify-center font-mono text-[11px] font-bold">1</span>
            <span>1: Slight (Low)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-[#fe798f]/40 text-[#740c2a] flex items-center justify-center font-mono text-[11px] font-bold">2</span>
            <span>2: Moderate (Medium)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-[#781d32] text-white flex items-center justify-center font-mono text-[11px] font-bold">3</span>
            <span>3: Substantial (High)</span>
          </div>
        </div>
      </div>

      {/* Interactive Matrix Table */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[#F5F2EB] border-b border-[#E7E3DC]">
                <th className="p-3 font-bold text-[#171c23] sticky left-0 bg-[#F5F2EB] z-20 min-w-[280px] border-r border-[#E7E3DC]">
                  Course Outcomes (CO)
                </th>
                {columns.map((col) => {
                  const isPSO = col.key.startsWith('PSO');
                  return (
                    <th
                      key={col.key}
                      className={`p-2.5 text-center font-mono font-bold border-r border-[#E7E3DC] min-w-[54px] ${
                        isPSO ? 'bg-[#FAF0F2] text-primary' : 'text-[#171c23]'
                      }`}
                      title={`${col.key}: ${col.title}`}
                    >
                      <div>{col.key}</div>
                      <div className="text-[9px] font-sans font-normal text-[#554244] truncate">{col.short}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {course.outcomes.map((co, index) => (
                <tr key={co.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]/50'}>
                  {/* CO description cell sticky */}
                  <td className="p-3 border-b border-r border-[#E7E3DC] sticky left-0 bg-inherit z-10">
                    <div className="flex items-start gap-2">
                      <span className="font-mono font-bold text-primary shrink-0 bg-[#ffd9dd] px-1.5 py-0.5 rounded text-[11px]">
                        {co.code}
                      </span>
                      <div className="line-clamp-2 text-[11px] leading-snug text-[#171c23]" title={co.statement}>
                        {co.statement}
                      </div>
                    </div>
                  </td>

                  {/* Matrix interactive cells */}
                  {columns.map((col) => {
                    const val = course.alignmentMatrix[co.id]?.[col.key] || 0;
                    return (
                      <td
                        key={col.key}
                        onClick={() => handleCellClick(co.id, col.key)}
                        className={`p-0 border-b border-r border-[#E7E3DC] text-center cursor-pointer transition-colors duration-100 ${getCellColor(
                          val
                        )}`}
                        title={`Click to cycle value. Current: ${val}`}
                      >
                        <div className="w-full h-11 flex items-center justify-center font-mono text-xs select-none">
                          {val === 0 ? '-' : val}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Bottom Summary Row: Column Averages */}
              <tr className="bg-[#FAF8F5] font-bold border-t-2 border-[#dbc0c2]">
                <td className="p-3 sticky left-0 bg-[#FAF8F5] z-10 border-r border-[#E7E3DC] text-[#171c23] uppercase text-[11px] tracking-wide">
                  Direct Average Attainment
                </td>
                {columns.map((col) => {
                  const stat = columnAverages[col.key];
                  const isUnmapped = stat.count === 0;
                  const isLow = stat.avg > 0 && stat.avg < 1.5;
                  return (
                    <td
                      key={col.key}
                      className={`p-2 border-r border-[#E7E3DC] text-center font-mono text-[11px] ${
                        isUnmapped
                          ? 'bg-red-50 text-red-700'
                          : isLow
                          ? 'bg-amber-50 text-amber-800'
                          : 'text-primary'
                      }`}
                      title={`${col.key} Average: ${stat.avg} across ${stat.count} outcomes`}
                    >
                      {stat.avg > 0 ? stat.avg.toFixed(1) : '-'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Correlation Insights Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-white border border-[#E7E3DC] rounded-lg">
          <h4 className="font-bold text-[#171c23] mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-700">insights</span>
            Strongly Mapped Outcomes
          </h4>
          <p className="text-[#554244] leading-relaxed">
            High coverage (average ≥ 2.5) across <strong>PO1 (Knowledge)</strong>, <strong>PO2 (Analysis)</strong>, <strong>PO3 (Design)</strong>, and <strong>PSO3 (Algorithmic Rigor)</strong>. Demonstrates rigorous foundational computer science competence according to Washington Accord graduate attributes.
          </p>
        </div>

        <div className="p-4 bg-white border border-[#E7E3DC] rounded-lg">
          <h4 className="font-bold text-[#171c23] mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-amber-700">warning</span>
            Accreditation Advisory Flag
          </h4>
          <p className="text-[#554244] leading-relaxed">
            <strong>PO7 (Environment &amp; Sustainability)</strong> and <strong>PO8 (Ethics)</strong> currently display slight or no correlation. The Rule Engine in Step 4 will analyze curriculum compliance against modern accreditation rubrics.
          </p>
        </div>
      </div>
    </div>
  );
};
