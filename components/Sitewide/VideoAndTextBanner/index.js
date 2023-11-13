"use client";
import React, { useState, useRef } from "react";
import parse from "html-react-parser";
import { Button } from "../../Elements/Button";

const VideoAndTextBanner = ({ ...props }) => {
  const {
    button,
    desktop_position,
    video_desktop,
    video_poster_desktop,
    video_mobile,
    video_poster_mobile,
    button_variants,
    text_input,
  } = props ?? {};

  const [isPlaying, setIsPlaying] = useState(false);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  const togglePlayPause = () => {
    if (mobileVideoRef.current && desktopVideoRef.current) {
      if (isPlaying) {
        mobileVideoRef.current.pause();
        desktopVideoRef.current.pause();
      } else {
        mobileVideoRef.current.play();
        desktopVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className={`video-and-text-banner tm-width tm-height `}>
      <div
        className={`w1 grid grid-cols-4 md:grid-cols-12 ${
          desktop_position === "right" ? "right" : ""
        }`}
      >
        <div
          className={`w2 md:col-span-8 col-span-4 ${
            isPlaying ? "pause" : "play"
          }`}
        >
          <>
            <video
              loop
              playsInline
              muted
              preload="metadata"
              ref={mobileVideoRef}
              poster={video_poster_mobile?.url}
              className="mobile"
              height="auto"
            >
              <source src={video_mobile?.url} />
              <track
                src=""
                kind="captions"
                srcLang="en"
                label="english_captions"
              ></track>
            </video>
            <video
              loop
              playsInline
              muted
              preload="metadata"
              ref={desktopVideoRef}
              poster={video_poster_desktop?.url}
              className="desktop"
            >
              <source src={video_desktop?.url} />
              <track
                src=""
                kind="captions"
                srcLang="en"
                label="english_captions"
              ></track>
            </video>
          </>
          <button
            className={`video-controls `}
            onClick={togglePlayPause}
            aria-label="play"
          ></button>
        </div>
        <div className="w3 md:col-span-4 col-span-4">
          {text_input ? parse(text_input) : null}
          <Button
            key={`btn_1`}
            href={button?.href ? button.href : "/"}
            label={button?.title ? button.title : "Shop now"}
            type={button_variants}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default VideoAndTextBanner;
