import React from 'react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E7E3DC] rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E3DC] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
            <h2 className="text-base font-bold text-[#171c23]">
              Accreditation Guidelines &amp; Bloom's Taxonomy Rubric
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded text-[#887173] hover:text-[#171c23] hover:bg-gray-100"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed text-[#171c23] custom-scrollbar">
          {/* Section 1: Revised Bloom's Taxonomy */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-primary uppercase tracking-wider">
              1. Revised Bloom’s Taxonomy Action Verbs
            </h3>
            <p className="text-[#554244]">
              Each Course Outcome must start with a measurable action verb from the cognitive domain (Anderson &amp; Krathwohl, 2001). Passive words like "know" or "understand" cannot be directly evaluated in OBE.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L1: Remember</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Define, list, recall, state, identify, recognize</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L2: Understand</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Describe, explain, summarize, classify, infer</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L3: Apply</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Implement, solve, execute, compute, utilize</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L4: Analyze</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Deconstruct, analyze, contrast, correlate, test</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L5: Evaluate</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Critique, assess, defend, validate, measure</div>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#E7E3DC]">
                <div className="font-bold text-primary">L6: Create</div>
                <div className="text-[11px] text-[#554244] mt-0.5">Design, construct, formulate, invent, compose</div>
              </div>
            </div>
          </div>

          {/* Section 2: Mapping Weights */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-primary uppercase tracking-wider">
              2. Correlation Mapping Scale (0 to 3)
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-[#554244]">
              <li><strong>Level 3 (Substantial / High):</strong> Outcome directly satisfies over 60% of the Program Outcome through core course assessments.</li>
              <li><strong>Level 2 (Moderate / Medium):</strong> Outcome contributes 30%–60% towards achieving the Program Outcome.</li>
              <li><strong>Level 1 (Slight / Low):</strong> Outcome introduces or reinforces concepts supporting less than 30% of the Program Outcome.</li>
              <li><strong>Level 0 (None / Dash):</strong> No measurable connection exists between this course outcome and the program outcome.</li>
            </ul>
          </div>

          {/* Section 3: Washington Accord Graduate Attributes */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-primary uppercase tracking-wider">
              3. Washington Accord &amp; NBA Graduate Attributes (PO1–PO12)
            </h3>
            <p className="text-[#554244]">
              Accreditation committees audit whether undergraduate programs adequately cover sustainability (PO7), professional ethics (PO8), and modern tools (PO5) in conjunction with technical foundations.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E7E3DC] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 bg-primary text-white rounded text-xs font-semibold hover:bg-[#611527]"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
