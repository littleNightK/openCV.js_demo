const scanner = new jscanify();
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
  video.onloadedmetadata = () => {
    video.play();
  };
  
  video.onplay = () => {
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    result.width = video.videoWidth;
    result.height = video.videoHeight;

    const canvasCtx = canvas.getContext("2d");
    const resultCtx = result.getContext("2d");

    setInterval(() => {
      canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const resultCanvas = scanner.highlightPaper(canvas);
      resultCtx.drawImage(resultCanvas, 0, 0, video.videoWidth, video.videoHeight);
    }, 10);
  };
});