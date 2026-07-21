"use client";

import { WatchTrailerButton } from "./TrailerPlayer";

interface TrailerButtonWrapperProps {
  youtubeKey: string;
  title: string;
}

export default function TrailerButtonWrapper({ youtubeKey, title }: TrailerButtonWrapperProps) {
  return <WatchTrailerButton youtubeKey={youtubeKey} title={title} />;
}
