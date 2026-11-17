import katex from 'katex';

interface MathFormulaProps {
  latex: string;
  display?: boolean;
  className?: string;
}

export function MathFormula({ latex, display = false, className = '' }: MathFormulaProps) {
  const html = katex.renderToString(latex, {
    displayMode: display,
    throwOnError: false,
    strict: false,
  });

  return (
    <span
      className={display ? `block overflow-x-auto py-1 ${className}` : `inline-block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
