let sharedStream: MediaStream | null = null;
let acquirePromise: Promise<MediaStream> | null = null;

const cameraConstraints: MediaStreamConstraints = {
  video: { facingMode: "user" },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
  },
};

export function getActiveCameraStream() {
  if (sharedStream?.active) return sharedStream;
  return null;
}

function streamHasAudio(stream: MediaStream) {
  return stream.getAudioTracks().some((track) => track.readyState === "live");
}

export async function acquireCameraStream() {
  const active = getActiveCameraStream();
  if (active && streamHasAudio(active)) return active;
  if (active) releaseCameraStream();

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("Camera not supported");
  }

  if (!acquirePromise) {
    acquirePromise = navigator.mediaDevices
      .getUserMedia(cameraConstraints)
      .then((stream) => {
        sharedStream = stream;
        acquirePromise = null;
        return stream;
      })
      .catch((error) => {
        acquirePromise = null;
        throw error;
      });
  }

  return acquirePromise;
}

export function releaseCameraStream() {
  sharedStream?.getTracks().forEach((track) => track.stop());
  sharedStream = null;
  acquirePromise = null;
}

export async function attachStreamToVideo(
  video: HTMLVideoElement,
  stream: MediaStream,
) {
  video.srcObject = stream;
  await video.play();
}
