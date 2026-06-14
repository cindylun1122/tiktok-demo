import Link from "next/link";
import { FeedVideo } from "@/src/components/feed-video";
import { PhoneFrame } from "@/src/components/phone-frame";
import { StatusBar } from "@/src/components/status-bar";

export default function Home() {
  return (
    <PhoneFrame>
      <FeedVideo />
      <StatusBar />

      {/* Bottom scrim — transparent top → black bottom, between video and overlays */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[260px] bg-gradient-to-t from-black/75 via-black/35 to-transparent"
        aria-hidden
      />

      {/* Top Navigation */}
      <div className="relative z-10 flex items-center gap-2 px-[14px] pb-[10px] pt-1">
        <LiveTvIcon />
        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black)]">
          <div className="flex items-end justify-end gap-[14px] pr-0.5">
            <TopNavTab label="Explore" faded />
            <TopNavTab label="Local" />
            <TopNavTab label="Following" />
            <TopNavTab label="Shop" />
            <TopNavTab label="For You" active />
          </div>
        </div>
        <SearchIcon />
      </div>

      {/* Right Action Rail — 21px spacing, disc bottom 20px above nav */}
      <div className="absolute bottom-[102px] right-[12.5px] z-10 flex flex-col items-center gap-[20px]">
          <div className="relative mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            <div className="h-[47px] w-[47px] overflow-hidden rounded-full border-[2px] border-white bg-[#d9d9d9]">
              <div className="h-full w-full bg-gradient-to-br from-[#c4a882] via-[#9a8b7a] to-[#6f5f52]" />
            </div>
            <div className="absolute -bottom-[2px] left-1/2 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
              <span className="text-[14px] font-bold leading-none text-white">+</span>
            </div>
          </div>

          <ActionItem icon={<HeartIcon />} label="250.5K" />
          <ActionItem icon={<CommentIcon />} label="100K" />
          <ActionItem icon={<BookmarkIcon />} label="89K" />
          <ActionItem icon={<ShareIcon />} label="132.5K" />

          <div className="h-[40px] w-[40px] animate-disc-spin overflow-hidden rounded-full border-[5px] border-[#1a1a1a] bg-[#1a1a1a] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            <div className="h-full w-full bg-gradient-to-br from-amber-700 via-amber-500 to-amber-800" />
          </div>
        </div>

      {/* Video info — bottom 20px above nav */}
      <div className="absolute bottom-[102px] left-0 z-10 w-[calc(100%-80px)] px-[12.5px]">
          <Link
            href="/template"
            className="mb-2 inline-flex items-center gap-1.5 rounded-[4px] bg-black/45 px-2 py-[5px]"
          >
            <TemplateIcon />
            <span className="text-[13px] font-semibold leading-none text-white">
              Try TikTok template
            </span>
          </Link>
          <div className="flex items-center gap-1 text-[15px] leading-[20px]">
            <span className="font-bold text-white">kirkiimad</span>
            <span className="text-white/50">·</span>
            <span className="text-white/50">3d ago</span>
          </div>
          <p className="mt-1 text-[15px] font-normal leading-[20px] text-white">
            Post 1622 | 😳😳
          </p>
      </div>

      {/* Bottom nav — 390×82 */}
      <div className="absolute bottom-0 left-0 z-10 h-[82px] w-[390px] bg-black">
        <div className="flex h-[69px] items-center justify-between px-[12.5px]">
          <NavItem icon={<HomeIcon />} label="Home" active />
          <NavItem icon={<FriendsIcon />} label="Friends" />
          <CreateButton />
          <NavItem icon={<InboxIcon />} label="Inbox" badge={12} />
          <NavItem icon={<ProfileIcon />} label="Profile" />
        </div>
        <div className="absolute inset-x-0 bottom-[8px] flex justify-center">
          <div className="h-[5px] w-[134px] rounded-full bg-white" />
        </div>
      </div>
    </PhoneFrame>
  );
}

function TopNavTab({
  label,
  active = false,
  faded = false,
}: {
  label: string;
  active?: boolean;
  faded?: boolean;
}) {
  return (
    <span
      className={`relative shrink-0 pb-[7px] text-[16px] leading-[20px] [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] ${
        active
          ? "font-bold text-white"
          : faded
            ? "font-semibold text-white/35"
            : "font-semibold text-white/60"
      }`}
    >
      {label}
      {active ? (
        <span className="absolute inset-x-[-2px] bottom-0 h-[3px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
      ) : null}
    </span>
  );
}

function ActionItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-[6px]">
      <div className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">{icon}</div>
      <span className="text-[13px] font-semibold leading-none text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
        {label}
      </span>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <div className="relative flex w-[67.6px] flex-col items-center gap-[2px]">
      <div className={active ? "text-white" : "text-[#a3a3a3]"}>{icon}</div>
      <span
        className={`text-[10px] font-semibold leading-none ${active ? "text-white" : "text-[#a3a3a3]"}`}
      >
        {label}
      </span>
      {badge !== undefined && (
        <span className="absolute right-[10px] top-[-2px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#fe2c55] px-[4px] text-[10px] font-bold leading-none text-white">
          {badge}
        </span>
      )}
    </div>
  );
}

function CreateButton() {
  return (
    <div className="flex w-[67.6px] flex-col items-center">
      <div
        className="flex h-[26px] w-[45px] items-center justify-center rounded-[6px] bg-white"
        style={{
          boxShadow: "-2.5px 0 0 0 #25f4ee, 2.5px 0 0 0 #fe2c55",
        }}
      >
        <span className="text-[20px] font-light leading-none text-black">+</span>
      </div>
    </div>
  );
}

function TemplateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect width="18" height="18" rx="3" fill="#FACE15" />
      <rect x="3" y="4" width="8" height="10" rx="1" fill="white" />
      <rect x="7" y="6" width="8" height="10" rx="1" fill="white" fillOpacity="0.85" />
      <path d="M9 9l2 1.5v3L9 12v-3z" fill="#FACE15" />
    </svg>
  );
}

function LiveTvIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
      <path
        d="M8 6.5L6.5 4.5M16 6.5L17.5 4.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="white"
        strokeWidth="1.5"
      />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="white"
        fontSize="6.5"
        fontWeight="bold"
        fontFamily="system-ui, sans-serif"
      >
        LIVE
      </text>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
      <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
      <path
        d="M16.5 16.5L21 21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 3H5a3 3 0 00-3 3v10a3 3 0 003 3h2.2l3.3 3.3c.4.4 1.1.1 1.1-.4V19H19a3 3 0 003-3V6a3 3 0 00-3-3z"
        fill="white"
      />
      <circle cx="8.5" cy="11" r="1.2" fill="#1a1a1a" />
      <circle cx="12" cy="11" r="1.2" fill="#1a1a1a" />
      <circle cx="15.5" cy="11" r="1.2" fill="#1a1a1a" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
      <path d="M7 3h10a2 2 0 012 2v16l-7-3.2L5 21V5a2 2 0 012-2z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="35" height="35" viewBox="0 0 24 24" fill="white">
      <path d="M8 19V9.8C8 7.24 10.24 5 12.8 5H15V2l7 7-7 7v-3h-2.2C10.24 13 8 15.24 8 17.8V19z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
    </svg>
  );
}

function FriendsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
