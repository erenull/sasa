import { useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/physicsNotes';

export function ExamPractice() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const correctCount = QUIZ_QUESTIONS.reduce(
    (acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc),
    0
  );

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <section id="kendini-dene" className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 no-print">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
        <div>
          <p className="text-xs font-medium text-sky-700 mb-1">
            Sınav Pratiği · 8 Vize Tipi Soru
          </p>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Kendini Dene — Mini Vize Testi
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {checked && (
            <span className="text-sm font-semibold font-mono-tabular text-slate-900" data-testid="quiz-score">
              Sonuç: {correctCount} / {QUIZ_QUESTIONS.length} Doğru
            </span>
          )}
          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={answeredCount === 0}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0"
          >
            Cevapları Kontrol Et
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Testi Sıfırla"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Sıfırla</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {QUIZ_QUESTIONS.map((q, qIdx) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div key={q.id} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <span>Soru {qIdx + 1}</span>
                  <span>{q.topic}</span>
                </div>
                <p className="text-sm font-medium text-slate-900 mb-3 leading-relaxed">
                  {q.question}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selected === oIdx;
                    let optionStyle =
                      'border-slate-200 bg-white text-slate-800 hover:border-sky-300';
                    if (checked) {
                      if (oIdx === q.correctIndex) {
                        optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                      } else if (isSelected && oIdx !== q.correctIndex) {
                        optionStyle = 'border-red-400 bg-red-50 text-red-900';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-sky-600 bg-sky-50 text-sky-900 font-medium';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs rounded-lg border transition-colors flex items-center justify-between gap-2 ${optionStyle}`}
                      >
                        <span>
                          <strong className="font-mono-tabular mr-1.5">
                            {String.fromCharCode(65 + oIdx)}){' '}
                          </strong>
                          {opt}
                        </span>
                        {checked && oIdx === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                        )}
                        {checked && isSelected && oIdx !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-red-600 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {checked && (
                <div
                  className={`mt-3 pt-3 border-t border-slate-200 text-xs ${
                    isCorrect ? 'text-emerald-800' : 'text-slate-700'
                  }`}
                >
                  <strong>Çözüm: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
