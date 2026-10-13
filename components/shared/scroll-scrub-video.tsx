"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";

type ScrollScrubVideoProps = {
  src: string;
  label: string;
  className?: string;
};

/**
 * A muted video whose playback position follows the page scroll: 0% when the
 * container's top reaches 85% of the viewport, 100% when its bottom reaches 25%.
 */
export function ScrollScrubVideo({ src, label, className }: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Latest requested time while the browser is still busy with a previous seek. */
  const pendingTime = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  function seek(progress: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration === 0) return;

    const time = progress * video.duration;
    // Seeks don't queue nicely — keep only the newest target until the current one lands.
    if (video.seeking) {
      pendingTime.current = time;
      return;
    }
    video.currentTime = time;
  }

  useMotionValueEvent(scrollYProgress, "change", seek);

  function handleSeeked() {
    const video = videoRef.current;
    if (!video || pendingTime.current === null) return;
    video.currentTime = pendingTime.current;
    pendingTime.current = null;
  }

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        aria-label={label}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        // Metadata just arrived: jump to wherever the page is already scrolled.
        onLoadedMetadata={() => seek(scrollYProgress.get())}
        onSeeked={handleSeeked}
        className="aspect-video h-auto w-full rounded-xl object-cover shadow-2xl"
      />
    </div>
  );
}
