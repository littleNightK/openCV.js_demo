document.getElementById('showVideo').addEventListener('click', function() {
    document.getElementById('videoContainer').style.display = 'block';
  
    const scanner = new jscanify();
    const canvas = document.getElementById("canvas");
    const result = document.getElementById("result");
    const video = document.getElementById("video");
  
    function handleSuccess(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", ""); // required on iOS
      video.muted = true; // required on iOS to autoplay
      video.play();
      video.style.display = "";
    }
  
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
      })
      .then(handleSuccess)
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  
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