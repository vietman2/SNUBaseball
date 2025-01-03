interface Props {
  size?: number;
  pitcher?: string;
  catcher?: string;
  first?: string;
  second?: string;
  third?: string;
  short?: string;
  left?: string;
  center?: string;
  right?: string;
  dh?: string;
}

export function Ballpark({
  size = 120,
  pitcher,
  catcher,
  first,
  second,
  third,
  short,
  left,
  center,
  right,
  dh,
}: Readonly<Props>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_251_142)">
        <path
          d="M3.90217 51.1353C45.4724 0.671569 76.9091 3.14379 117.039 51.1359L60.4701 107.704L3.90217 51.1353Z"
          fill="#7EAF34"
          stroke="#C63F00"
        />
        <path
          d="M40.6914 73.7846C57.1877 49.9555 65.0641 49.5524 80.2897 73.784"
          stroke="#FBCEB1"
          strokeWidth="10"
          strokeMiterlimit="4.13357"
          strokeLinecap="round"
        />
        <circle
          cx="60.5784"
          cy="74.6626"
          r="2"
          transform="rotate(-45 60.5784 74.6626)"
          fill="#FBCEB1"
        />
        <path
          d="M43.5195 75.1978L61.9043 56.813"
          stroke="#7EAF34"
          strokeWidth="4"
        />
        <line
          x1="59.0763"
          y1="56.8133"
          x2="77.4611"
          y2="75.1981"
          stroke="#7EAF34"
          strokeWidth="4"
        />
        <circle
          cx="60.491"
          cy="93.5825"
          r="5"
          transform="rotate(-45 60.491 93.5825)"
          fill="#FBCEB1"
        />
        <circle
          cx="80.2895"
          cy="73.7837"
          r="3"
          transform="rotate(-45 80.2895 73.7837)"
          fill="#FBCEB1"
        />
        <circle
          cx="60.4907"
          cy="53.9849"
          r="3"
          transform="rotate(-45 60.4907 53.9849)"
          fill="#FBCEB1"
        />
        <circle
          cx="40.6919"
          cy="73.7837"
          r="3"
          transform="rotate(-45 40.6919 73.7837)"
          fill="#FBCEB1"
        />
        <line
          x1="33.9747"
          y1="72.016"
          x2="41.7529"
          y2="79.7942"
          stroke="#7EAF34"
          strokeWidth="3"
        />
        <line
          x1="77.8143"
          y1="81.2084"
          x2="88.4209"
          y2="70.6018"
          stroke="#7EAF34"
          strokeWidth="3"
        />
        <line
          x1="61.25"
          y1="74.6499"
          x2="59.75"
          y2="74.6499"
          stroke="white"
          strokeWidth="0.5"
        />
        <path
          d="M82.4104 74.4908C83.1914 73.7097 83.1914 72.4434 82.4104 71.6624C81.6293 70.8813 80.363 70.8813 79.582 71.6624L82.4104 74.4908ZM63.3185 93.5827L82.4104 74.4908L79.582 71.6624L60.4901 90.7542L63.3185 93.5827Z"
          fill="#FBCEB1"
        />
        <path
          d="M41.3985 71.6624C40.6175 70.8813 39.3511 70.8813 38.5701 71.6624C37.789 72.4434 37.789 73.7097 38.5701 74.4908L41.3985 71.6624ZM60.4904 90.7542L41.3985 71.6624L38.5701 74.4908L57.662 93.5827L60.4904 90.7542Z"
          fill="#FBCEB1"
        />
        <path
          d="M59.3599 93.8653V91.6025H61.6226V93.8653L60.4913 94.9966L59.3599 93.8653Z"
          fill="white"
        />
        <rect
          x="59.0762"
          y="53.9849"
          width="2"
          height="2"
          transform="rotate(-45 59.0762 53.9849)"
          fill="white"
        />
        <rect
          x="78.875"
          y="73.7837"
          width="2"
          height="2"
          transform="rotate(-45 78.875 73.7837)"
          fill="white"
        />
        <rect
          x="39.2773"
          y="73.7837"
          width="2"
          height="2"
          transform="rotate(-45 39.2773 73.7837)"
          fill="white"
        />
        <line
          x1="58.5459"
          y1="92.6987"
          x2="10.4626"
          y2="44.6155"
          stroke="white"
          strokeWidth="0.5"
        />
        <line
          x1="62.4346"
          y1="92.6987"
          x2="110.518"
          y2="44.6155"
          stroke="white"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_251_142">
          <rect width="120" height="120" fill="white" />
        </clipPath>
      </defs>
      {pitcher && (
        <text
          x="50%"
          y="64%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {pitcher}
        </text>
      )}
      {catcher && (
        <text
          x="50%"
          y="82%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {catcher}
        </text>
      )}
      {first && (
        <text
          x="70%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {first}
        </text>
      )}
      {second && (
        <text
          x="60%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {second}
        </text>
      )}
      {third && (
        <text
          x="30%"
          y="62%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {third}
        </text>
      )}
      {short && (
        <text
          x="40%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {short}
        </text>
      )}
      {left && (
        <text
          x="28%"
          y="36%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {left}
        </text>
      )}
      {center && (
        <text
          x="50%"
          y="28%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {center}
        </text>
      )}
      {right && (
        <text
          x="72%"
          y="36%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {right}
        </text>
      )}
      {dh && (
        <text
          x="68%"
          y="82%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="5.5"
          fill="black"
          fontWeight={800}
        >
          {dh}
        </text>
      )}
    </svg>
  );
}
