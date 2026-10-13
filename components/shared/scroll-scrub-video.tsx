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
 * container's top reaches 95% of the viewport, 100% when its bottom reaches 5%
 * (almost leaving through the top).
 * The file is encoded with a keyframe every 6 frames, so seeking on every scroll
 * change stays cheap.
 */
export function ScrollScrubVideo({ src, label, className }: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "end 0.05"],
  });

  function seek(progress: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration === 0) return;
    video.currentTime = progress * video.duration;
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => seek(latest));

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
        className="aspect-video h-auto w-full rounded-xl object-cover shadow-2xl"
      />
    </div>
  );
}
