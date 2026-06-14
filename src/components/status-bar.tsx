function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="white">
      <rect x="0" y="8" width="3" height="4" rx="0.5" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.5" />
      <rect x="10" y="3" width="3" height="9" rx="0.5" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
      <path d="M8 3.5c2.2 0 4.2.9 5.7 2.3l1.4-1.4C13.3 2.5 10.8 1.5 8 1.5S2.7 2.5 1 4.4l1.4 1.4C3.8 4.4 5.8 3.5 8 3.5z" />
      <path d="M8 7c1.2 0 2.3.5 3.1 1.3l1.4-1.4C11.4 6 9.8 5.3 8 5.3s-3.4.7-4.5 1.9l1.4 1.4C5.7 7.5 6.8 7 8 7z" />
      <circle cx="8" cy="10.5" r="1.5" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        stroke="white"
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="18" height="9" rx="1.5" fill="white" />
      <path
        d="M24 4.5v4a1.5 1.5 0 000-4z"
        fill="white"
        fillOpacity="0.4"
      />
    </svg>
  );
}

export function StatusBar() {
  return (
    <div className="status-bar relative z-20 flex h-[54px] items-end justify-between px-[14px] pb-[8px] text-[15px] font-semibold leading-none text-white">
      <span>9:41</span>
      <div className="flex items-center gap-[5px]">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}
