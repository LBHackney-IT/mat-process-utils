import React from "react";

export interface ThumbnailProps {
  src: string;
  alt: string;
}

export const Thumbnail: React.FunctionComponent<ThumbnailProps> = (props) => {
  const { src, alt } = props;

  return (
    <>
      <img src={src} alt={alt} />

      <style jsx>{`
        img {
          max-height: 2.5em;
        }
      `}</style>
    </>
  );
};
