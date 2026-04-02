interface PuzzlePieceProps {
  color: "electric" | "purple" | "mint";
  className?: string;
}

const colorMap = {
  electric: {
    main: "#1A1AFF",
    light: "#4D4DFF",
    dark: "#1010CC",
    shadow: "rgba(26,26,255,0.3)",
  },
  purple: {
    main: "#8A2BE2",
    light: "#A855F7",
    dark: "#6B21A8",
    shadow: "rgba(138,43,226,0.3)",
  },
  mint: {
    main: "#00C9A7",
    light: "#34D9BD",
    dark: "#009E83",
    shadow: "rgba(0,201,167,0.3)",
  },
};

export function PuzzlePiece({ color, className = "" }: PuzzlePieceProps) {
  const c = colorMap[color];

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-lg"
        style={{ filter: `drop-shadow(4px 6px 12px ${c.shadow})` }}
      >
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.light} />
            <stop offset="100%" stopColor={c.dark} />
          </linearGradient>
          <linearGradient id={`shine-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="50%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Sombra 3D */}
        <path
          d="M18 108 L18 42 C18 42 18 30 30 30 L42 30 C42 30 42 18 54 12 C66 6 66 18 66 30 L78 30 C90 30 90 42 90 42 L90 54 C90 54 102 54 108 66 C114 78 102 78 90 78 L90 90 C90 102 78 108 78 108 L66 108 C66 108 66 120 54 120 C42 120 42 108 42 108 L30 108 C18 108 18 108 18 108 Z"
          fill={c.dark}
          opacity="0.4"
          transform="translate(3, 3)"
        />

        {/* Peça principal */}
        <path
          d="M15 105 L15 39 C15 39 15 27 27 27 L39 27 C39 27 39 15 51 9 C63 3 63 15 63 27 L75 27 C87 27 87 39 87 39 L87 51 C87 51 99 51 105 63 C111 75 99 75 87 75 L87 87 C87 99 75 105 75 105 L63 105 C63 105 63 117 51 117 C39 117 39 105 39 105 L27 105 C15 105 15 105 15 105 Z"
          fill={`url(#grad-${color})`}
        />

        {/* Brilho 3D */}
        <path
          d="M15 105 L15 39 C15 39 15 27 27 27 L39 27 C39 27 39 15 51 9 C63 3 63 15 63 27 L75 27 C87 27 87 39 87 39 L87 51 C87 51 99 51 105 63 C111 75 99 75 87 75 L87 87 C87 99 75 105 75 105 L63 105 C63 105 63 117 51 117 C39 117 39 105 39 105 L27 105 C15 105 15 105 15 105 Z"
          fill={`url(#shine-${color})`}
        />

        {/* Reflexo superior */}
        <path
          d="M20 40 C20 32 28 30 28 30 L38 30 C38 30 40 18 51 12 C58 8 60 14 60 20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.25"
          fill="none"
        />
      </svg>
    </div>
  );
}
