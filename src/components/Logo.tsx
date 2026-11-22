// Logo MatSkrin: hati yang tangkainya membentuk simbol perempuan (♀).
// Warna mengikuti currentColor; versi berkas statis ada di public/favicon.svg.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M16 19.5C9 15 3.5 11.3 4.2 7.2 4.8 3.6 9.6 1.9 13 4.4c1.3.9 2.3 2 3 3.2.7-1.2 1.7-2.3 3-3.2 3.4-2.5 8.2-.8 8.8 2.8.7 4.1-4.8 7.8-11.8 12.3z"
      />
      <path d="M16 19v11M11 25h10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
