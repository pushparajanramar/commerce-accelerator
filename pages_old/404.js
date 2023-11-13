export default function Custom404() {
  return (
    <div className="page-404">
      <div className="legend-404">404 PAGE</div>
      <video
        className="w-screen h-screen object-cover"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={false}
        webkit-playsinline={false}
      >
        <source
          src="https://www.travismathew.com/medias/sys_master/images/images/h39/hb9/8806028738590/8806028738590.bin"
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
}
