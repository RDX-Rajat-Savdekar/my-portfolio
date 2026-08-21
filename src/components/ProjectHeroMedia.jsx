const isVideoSrc = (src) => /\.(mp4|webm)$/i.test(src ?? '');

/** Hero media for project pages: looping preview, richer clip on hover. */
export default function ProjectHeroMedia({ media }) {
  const preview = media?.preview || media?.poster;
  if (!preview) return null;

  return (
    <div className="project-page-media">
      {isVideoSrc(preview) ? (
        <video
          className="project-page-preview"
          src={preview}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <img className="project-page-preview" src={preview} alt="" />
      )}
      {media.hover && media.hover !== preview && (
        <video
          className="project-page-video"
          src={media.hover}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
        />
      )}
    </div>
  );
}
