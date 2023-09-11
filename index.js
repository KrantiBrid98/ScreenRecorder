var blob, mediaRecorder = null;
var chunks = [];

// For more info, check https://developer.mozilla.org/en-US/docs/Web/API/Navigator
// reference https://medium.com/@anirudh.munipalli/create-a-screen-recorder-with-simple-javascript-114d0710e6bf


async function startRecording() {
    var stream = await navigator.mediaDevices.getDisplayMedia(
        { video: { mediaSource: "screen" }, audio: true }
    );

    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            chunks.push(e.data);
        }
    }
    mediaRecorder.onstop = () => {
        chunks = [];
    }
    mediaRecorder.start(250)
}

function stopRecording() {
    var filename = window.prompt("File name", "video"); // Ask the file name

    mediaRecorder.stop(); // Stopping the recording
    blob = new Blob(chunks, { type: "video/webm" })
    chunks = [] // Resetting the data chunks
    var dataDownloadUrl = URL.createObjectURL(blob);

    // Downloadin it onto the user's device
    let a = document.createElement('a')
    a.href = dataDownloadUrl;
    a.download = `${filename}.webm`
    a.click()

    URL.revokeObjectURL(dataDownloadUrl)
}

function togglebutton() {
    let buttonElement = document.getElementById('record-btn');

    if (buttonElement.innerText == 'Start Recording') {
        buttonElement.innerText = 'Stop Recording';
        buttonElement.className = 'btn stop-btn'
        startRecording();
    } else {
        buttonElement.innerText = 'Start Recording'
        buttonElement.className = 'btn start-btn'
        stopRecording();
    }
}

document.getElementById('record-btn').addEventListener('click', togglebutton)