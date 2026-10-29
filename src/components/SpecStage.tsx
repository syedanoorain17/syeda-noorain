import React, { useState } from 'react';
import { CourseSpecification, CourseOutcome, CourseModule } from '../types';

interface SpecStageProps {
  course: CourseSpecification;
  onUpdateCourse: (updated: Partial<CourseSpecification>) => void;
  onAdvanceToMatrix: () => void;
}

export const SpecStage: React.FC<SpecStageProps> = ({
  course,
  onUpdateCourse,
  onAdvanceToMatrix,
}) => {
  const [activeTab, setActiveTab] = useState<'outcomes' | 'modules' | 'overview'>('outcomes');
  const [editingCoId, setEditingCoId] = useState<string | null>(null);

  // Recalculate total hours
  const totalModuleHours = course.modules.reduce((sum, m) => sum + m.lectureHours + m.tutorialHours, 0);
  const totalOutcomeHours = course.outcomes.reduce((sum, o) => sum + o.contactHours, 0);

  const bloomsDistribution = course.outcomes.reduce((acc, o) => {
    acc[o.bloomsLevel] = (acc[o.bloomsLevel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleOutcomeChange = (id: string, field: keyof CourseOutcome, value: any) => {
    const updated = course.outcomes.map((co) => (co.id === id ? { ...co, [field]: value } : co));
    onUpdateCourse({ outcomes: updated });
  };

  const handleAddOutcome = () => {
    const nextNum = course.outcomes.length + 1;
    const newOutcome: CourseOutcome = {
      id: `co-${Date.now()}`,
      code: `CO${nextNum}`,
      statement: `Apply algorithmic design heuristics to optimize system computational bottlenecks.`,
      bloomsLevel: 'Apply (L3)',
      contactHours: 10,
      cieWeight: 20,
      seeWeight: 20
    };
    onUpdateCourse({ outcomes: [...course.outcomes, newOutcome] });
  };

  const handleDeleteOutcome = (id: string) => {
    if (course.outcomes.length <= 2) return;
    const updated = course.outcomes.filter((co) => co.id !== id);
    onUpdateCourse({ outcomes: updated });
  };

  const handleModuleChange = (id: string, field: keyof CourseModule, value: any) => {
    const updated = course.modules.map((m) => (m.id === id ? { ...m, [field]: value } : m));
    onUpdateCourse({ modules: updated });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-8 space-y-6">
      {/* Course Header Banner */}
      <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-xs font-bold bg-[#ffd9dd] text-primary px-2.5 py-1 rounded border border-[#dbc0c2]">
                {course.code}
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-[#171c23] tracking-tight">
                {course.title}
              </h1>
            </div>
            <p className="text-xs text-[#554244] mt-1">
              {course.department} • Level: {course.degree} • Semester: {course.semester}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAdvanceToMatrix}
              type="button"
              className="px-4 py-2 bg-primary-container hover:bg-[#611527] text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
            >
              <span>Proceed to CO-PO-PSO Alignment</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Course Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[#554244] text-[11px]">Credit Structure</div>
            <div className="text-sm font-bold text-primary mt-0.5">
              {course.credits.toFixed(1)} Credits (L-T-P: {course.ltp.lecture}-{course.ltp.tutorial}-{course.ltp.practical})
            </div>
          </div>
          <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[#554244] text-[11px]">Total Contact Hours</div>
            <div className="text-sm font-bold text-[#171c23] mt-0.5 flex items-center gap-1.5">
              <span>{totalModuleHours} Hours</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded">Exact</span>
            </div>
          </div>
          <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[#554244] text-[11px]">Target Course Outcomes</div>
            <div className="text-sm font-bold text-[#171c23] mt-0.5">
              {course.outcomes.length} Formulated (L3–L6 Dominant)
            </div>
          </div>
          <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
            <div className="text-[#554244] text-[11px]">Accreditation Standard</div>
            <div className="text-sm font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              NBA Tier-1 Criteria
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-[#E7E3DC]">
        <button
          onClick={() => setActiveTab('outcomes')}
          type="button"
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'outcomes'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-[#554244] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">list_alt</span>
          <span>Course Outcomes (CO) &amp; Bloom's Level ({course.outcomes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('modules')}
          type="button"
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'modules'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-[#554244] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">view_module</span>
          <span>Syllabus Modules &amp; Textbooks ({course.modules.length} Units)</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          type="button"
          className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-[#554244] hover:text-[#171c23]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">description</span>
          <span>Course Description &amp; Prerequisites</span>
        </button>
      </div>

      {/* TAB 1: Course Outcomes Editor */}
      {activeTab === 'outcomes' && (
        <div className="space-y-4">
          {/* Bloom's taxonomy summary card */}
          <div className="p-4 bg-white border border-[#E7E3DC] rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#554244]">
                Bloom’s Taxonomy Distribution
              </span>
              <span className="text-[11px] text-[#554244]">
                Target: 60%+ in Higher-Order Thinking Skills (HOTS: Apply, Analyze, Evaluate, Create)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['Remember (L1)', 'Understand (L2)', 'Apply (L3)', 'Analyze (L4)', 'Evaluate (L5)', 'Create (L6)'].map((level) => {
                const count = bloomsDistribution[level] || 0;
                return (
                  <div
                    key={level}
                    className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 ${
                      count > 0 ? 'bg-[#FAF0F2] border-[#dbc0c2] text-primary font-semibold' : 'bg-[#FAF8F5] border-[#E7E3DC] text-[#887173]'
                    }`}
                  >
                    <span>{level.split(' ')[0]}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#E7E3DC]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* List of Outcomes */}
          <div className="space-y-3">
            {course.outcomes.map((co) => (
              <div
                key={co.id}
                className="bg-white border border-[#E7E3DC] rounded-lg p-4 transition-all hover:border-[#887173]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded bg-primary-container text-white flex items-center justify-center font-mono font-bold text-xs">
                      {co.code}
                    </span>
                    <select
                      value={co.bloomsLevel}
                      onChange={(e) => handleOutcomeChange(co.id, 'bloomsLevel', e.target.value)}
                      className="text-xs font-semibold px-2 py-1 rounded bg-[#FAF8F5] border border-[#E7E3DC] text-primary cursor-pointer"
                    >
                      <option value="Remember (L1)">Remember (L1)</option>
                      <option value="Understand (L2)">Understand (L2)</option>
                      <option value="Apply (L3)">Apply (L3)</option>
                      <option value="Analyze (L4)">Analyze (L4)</option>
                      <option value="Evaluate (L5)">Evaluate (L5)</option>
                      <option value="Create (L6)">Create (L6)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#554244]">Hours:</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={co.contactHours}
                        onChange={(e) => handleOutcomeChange(co.id, 'contactHours', parseInt(e.target.value) || 0)}
                        className="w-14 px-2 py-0.5 border border-[#E7E3DC] rounded text-center font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#554244]">CIE / SEE:</span>
                      <span className="font-mono text-xs font-semibold">{co.cieWeight}% / {co.seeWeight}%</span>
                    </div>

                    <button
                      onClick={() => handleDeleteOutcome(co.id)}
                      className="p-1 text-[#887173] hover:text-red-700 hover:bg-red-50 rounded"
                      title="Delete Outcome"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                {/* Outcome Statement Textarea */}
                <textarea
                  rows={2}
                  value={co.statement}
                  onChange={(e) => handleOutcomeChange(co.id, 'statement', e.target.value)}
                  className="w-full text-xs font-normal text-[#171c23] p-2.5 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={handleAddOutcome}
              type="button"
              className="px-3.5 py-1.5 border border-dashed border-primary text-primary hover:bg-[#FAF0F2] rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Course Outcome</span>
            </button>

            <span className="text-xs font-mono text-[#554244]">
              Total Allocated Hours across COs: <strong>{totalOutcomeHours} hrs</strong>
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: Modules & Textbooks */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          {course.modules.map((module) => (
            <div key={module.id} className="bg-white border border-[#E7E3DC] rounded-lg p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E7E3DC]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-[#FAF8F5] border border-[#E7E3DC] text-primary px-2 py-0.5 rounded">
                    Unit {module.unitNumber}
                  </span>
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) => handleModuleChange(module.id, 'title', e.target.value)}
                    className="font-bold text-xs text-[#171c23] bg-transparent border-b border-transparent hover:border-[#dbc0c2] focus:border-primary outline-none px-1"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#554244]">Lecture:</span>
                  <input
                    type="number"
                    value={module.lectureHours}
                    onChange={(e) => handleModuleChange(module.id, 'lectureHours', parseInt(e.target.value) || 0)}
                    className="w-12 px-1.5 py-0.5 border border-[#E7E3DC] rounded font-mono text-center text-xs"
                  />
                  <span className="text-[#554244]">Tutorial:</span>
                  <input
                    type="number"
                    value={module.tutorialHours}
                    onChange={(e) => handleModuleChange(module.id, 'tutorialHours', parseInt(e.target.value) || 0)}
                    className="w-12 px-1.5 py-0.5 border border-[#E7E3DC] rounded font-mono text-center text-xs"
                  />
                  <span className="font-mono text-xs font-bold text-primary">
                    = {module.lectureHours + module.tutorialHours} hrs
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#554244] mb-1">
                  Topics Covered:
                </label>
                <textarea
                  rows={3}
                  value={module.topics}
                  onChange={(e) => handleModuleChange(module.id, 'topics', e.target.value)}
                  className="w-full text-xs text-[#171c23] p-2 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#554244] mb-1">
                  Textbook &amp; Reference Citations:
                </label>
                <input
                  type="text"
                  value={module.textbookRefs}
                  onChange={(e) => handleModuleChange(module.id, 'textbookRefs', e.target.value)}
                  className="w-full text-xs text-[#171c23] p-2 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Overview & Prerequisites */}
      {activeTab === 'overview' && (
        <div className="bg-white border border-[#E7E3DC] rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#171c23] mb-1">Course Description &amp; Scope</label>
            <textarea
              rows={4}
              value={course.description}
              onChange={(e) => onUpdateCourse({ description: e.target.value })}
              className="w-full text-xs p-3 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c23] mb-1">Formal Prerequisites</label>
            <input
              type="text"
              value={course.prerequisites}
              onChange={(e) => onUpdateCourse({ prerequisites: e.target.value })}
              className="w-full text-xs p-2.5 rounded border border-[#E7E3DC] bg-[#FAF8F5] focus:bg-white focus:border-primary outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
