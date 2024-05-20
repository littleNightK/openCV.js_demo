const scanner = new jscanify();
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const video = document.getElementById('video');

navigator.mediaDevices.getUserMedia({ 
  video: { 
    facingMode: { exact: "environment" } 
  } 
}).then((stream) => {
  video.srcObject = stream;
  video.muted = true; // Ensure the video is muted
  video.onloadedmetadata = () => {
    video.play();
  };
  
  video.onplay = () => {
    // Set canvas dimensions to match video, but scale down if necessary
    const maxDimension = Math.min(video.videoWidth, video.videoHeight, 1024); // iOS limit
    const aspectRatio = video.videoWidth / video.videoHeight;
    if (video.videoWidth > video.videoHeight) {
      canvas.width = maxDimension;
      canvas.height = maxDimension / aspectRatio;
    } else {
      canvas.width = maxDimension * aspectRatio;
      canvas.height = maxDimension;
    }
    result.width = canvas.width;
    result.height = canvas.height;

    const canvasCtx = canvas.getContext("2d");
    const resultCtx = result.getContext("2d");

    setInterval(() => {
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const resultCanvas = scanner.highlightPaper(canvas);
      resultCtx.drawImage(resultCanvas, 0, 0, result.width, result.height);
    }, 10);
  };
});