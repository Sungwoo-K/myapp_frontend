(() => {
  const videoSources = [
    "./video/video1.mp4",
    "./video/video2.mp4",
    "./video/video3.mp4",
    "./video/video4.mp4",
  ];

  const video = document.querySelector("video");
  const source = video.querySelector("source");

  function playRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    source.src = videoSources[randomIndex];
    video.load();
    video.play();
  }

  video.addEventListener("ended", () => {
    playRandomVideo();
  });

  playRandomVideo();
})();
