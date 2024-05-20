// Initialize jscanify scanner
const scanner = new jscanify();

// Get canvas context for drawing the highlighted document
const resultCanvas = document.getElementById("result");
const resultCtx = resultCanvas.getContext("2d");

// Get video element for live camera feed
const video = document.getElementById("video");

// Function to continuously capture video frames, scan for documents, and highlight them
function highlightDocument() {
    // Draw the current video frame onto the canvas
    resultCtx.drawImage(video, 0, 0, resultCanvas.width, resultCanvas.height);

    // Highlight the document in the current video frame
    const result = scanner.highlightPaper(resultCanvas);

    // Draw the highlighted document onto the canvas
    resultCtx.clearRect(0, 0, resultCanvas.width, resultCanvas.height); // Clear previous frame
    resultCtx.drawImage(result, 0, 0, resultCanvas.width, resultCanvas.height);

    // Request next frame
    requestAnimationFrame(highlightDocument);
}

// Start capturing video frames and highlighting documents
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
            highlightDocument(); // Start highlighting documents
        };
    })
    .catch((err) => {
        console.error("Error accessing webcam: ", err);
    });
