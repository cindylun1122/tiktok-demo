export type StructureClip = {
  clip: number;
  role: "A" | "B";
  emotion: string;
  emotionEmoji: string;
  line: string;
  cardLine: string;
  subtitle: string;
  duration: string;
  recordingDuration: number;
};

export const STRUCTURE_CLIPS: StructureClip[] = [
  {
    clip: 1,
    role: "A",
    emotion: "Surprised",
    emotionEmoji: "😮",
    line: 'A (Surprised) "Guess who broke up?"',
    cardLine: 'A(surprised): "Guess who broke up?"',
    subtitle: "Guess who broke up?",
    duration: "3.6s",
    recordingDuration: 2.6,
  },
  {
    clip: 2,
    role: "B",
    emotion: "Curious",
    emotionEmoji: "🤨",
    line: 'B (Curious) "Who?"',
    cardLine: 'B (Curious 🤨): "Who?"',
    subtitle: "Who?",
    duration: "2.4s",
    recordingDuration: 2.4,
  },
  {
    clip: 3,
    role: "A",
    emotion: "Sad",
    emotionEmoji: "😢",
    line: 'A (Sad) "Arthur Lima and Alencanzao"',
    cardLine: 'A (Sad): "Arthur Lima and Alencanzao"',
    subtitle: "Arthur Lima and Alencanzao",
    duration: "2.9s",
    recordingDuration: 2.9,
  },
  {
    clip: 4,
    role: "B",
    emotion: "Shocked",
    emotionEmoji: "😱",
    line: 'B (Shocked) "(Scream and cry)"',
    cardLine: 'B (Shocked): "(Scream and cry)"',
    subtitle: "(Scream and cry)",
    duration: "1.4s",
    recordingDuration: 1.4,
  },
];

export function getStructureClip(clip: number) {
  return STRUCTURE_CLIPS.find((item) => item.clip === clip) ?? STRUCTURE_CLIPS[0];
}

export function getClipStageHref(clip: number) {
  if (clip === 1) return "/template";
  if (clip > 4) return "/template/complete";
  return `/template/clip-${clip}`;
}

export function getClipRecordingHref(clip: number) {
  if (clip === 1) return "/template/recording";
  return `/template/recording/clip-${clip}`;
}

export function getClipRecordingAgainHref(clip: number) {
  if (clip === 1) return "/template/recording/again";
  return `/template/recording/clip-${clip}/again`;
}

export function getClipReviewHref(clip: number) {
  return `/template/clip-${clip}/review`;
}
