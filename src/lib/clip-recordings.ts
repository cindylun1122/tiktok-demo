const recordings = new Map<number, string>();
const thumbnails = new Map<number, string>();
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function subscribeClipRecordings(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function saveClipRecording(clip: number, blob: Blob) {
  const existing = recordings.get(clip);
  if (existing) URL.revokeObjectURL(existing);

  const existingThumb = thumbnails.get(clip);
  if (existingThumb) {
    URL.revokeObjectURL(existingThumb);
    thumbnails.delete(clip);
  }

  recordings.set(clip, URL.createObjectURL(blob));
  notifyListeners();

  void createVideoThumbnail(blob).then((thumbnailUrl) => {
    if (!thumbnailUrl) return;
    if (recordings.get(clip)) {
      thumbnails.set(clip, thumbnailUrl);
      notifyListeners();
    } else {
      URL.revokeObjectURL(thumbnailUrl);
    }
  });
}

export function getClipRecordingUrl(clip: number) {
  return recordings.get(clip) ?? null;
}

export function isClipRecorded(clip: number) {
  return recordings.has(clip);
}

export function areAllClipsRecorded(clips = [1, 2, 3, 4]) {
  return clips.every((clip) => recordings.has(clip));
}

export function getClipThumbnailUrl(clip: number) {
  return thumbnails.get(clip) ?? null;
}

export function getClipRecordingUrls(clips = [1, 2, 3, 4]) {
  return clips
    .map((clip) => getClipRecordingUrl(clip))
    .filter((url): url is string => url !== null);
}

export function getClipRecordingEntries(clips = [1, 2, 3, 4]) {
  return clips
    .map((clip) => ({
      clip,
      url: getClipRecordingUrl(clip),
    }))
    .filter((entry): entry is { clip: number; url: string } => entry.url !== null);
}

export function revokeClipRecording(clip: number) {
  const existing = recordings.get(clip);
  if (existing) {
    URL.revokeObjectURL(existing);
    recordings.delete(clip);
  }

  const existingThumb = thumbnails.get(clip);
  if (existingThumb) {
    URL.revokeObjectURL(existingThumb);
    thumbnails.delete(clip);
  }

  notifyListeners();
}

async function createVideoThumbnail(blob: Blob): Promise<string | null> {
  if (typeof document === "undefined") return null;

  const video = document.createElement("video");
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";

  const objectUrl = URL.createObjectURL(blob);

  try {
    video.src = objectUrl;

    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("video load failed"));
    });

    const seekTime =
      Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(0.15, video.duration * 0.25)
        : 0.01;

    video.currentTime = seekTime;

    await new Promise<void>((resolve) => {
      video.onseeked = () => resolve();
    });

    const { videoWidth, videoHeight } = video;
    if (videoWidth <= 0 || videoHeight <= 0) return null;

    const canvas = document.createElement("canvas");
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

    const thumbnailBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.82);
    });

    if (!thumbnailBlob) return null;

    return URL.createObjectURL(thumbnailBlob);
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(objectUrl);
    video.remove();
  }
}

function pickRecorderMimeType() {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];

  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }

  return "";
}

export function createClipRecorder(stream: MediaStream) {
  const mimeType = pickRecorderMimeType();
  return mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
}
