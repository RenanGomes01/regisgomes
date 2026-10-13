"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef } from "react";

type ScrollScrubVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
};

/**
 * A muted video whose playback position follows the page scroll: 0% when the
 * container's top reaches 95% of the viewport, 100% when its bottom reaches 60%
 * (still fully in view, so the painting finishes while the video is centred).
 * The file is encoded with a keyframe every 6 frames, so seeking on every scroll
 * change stays cheap.
 */
export function ScrollScrubVideo({ src, poster, label, className }: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.6"],
  });

  function seek(progress: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration === 0) return;
    video.currentTime = progress * video.duration;
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => seek(latest));

  /**
   * iOS Safari won't paint frames for a video that has never played, so seeking alone
   * leaves the poster on screen. A silent play() + pause() unlocks it; if the browser
   * refuses to play, the promise rejects and we just fall back to seeking.
   */
  function handleLoadedMetadata() {
    const video = videoRef.current;
    if (!video) return;

    const syncToScroll = () => seek(scrollYProgress.get());
    const playing = video.play();
    if (!playing) {
      video.pause();
      syncToScroll();
      return;
    }
    playing
      .then(() => video.pause())
      .catch(() => {})
      // play() may have advanced a few frames — snap back to the scroll position.
      .finally(syncToScroll);
  }

  // Mobile browsers often ignore preload="auto", so metadata never arrives and no frame
  // is drawn. Calling load() on mount makes them fetch the start of the file.
  useEffect(() => {
    videoRef.current?.load();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
        muted={true}
        playsInline={true}
        preload="auto"
        disablePictureInPicture
        onLoadedMetadata={handleLoadedMetadata}
        className="aspect-video h-auto w-full rounded-xl object-cover shadow-2xl"
      />
    </div>
  );
}
