(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];
  let videoURL = "";

  const fetchBookmarks = () => {
    // return new Promise((resolve) => {
    //   chrome.storage.sync.get([currentVideo], (obj) => {
    //     resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
    //   });
    // });
  };


  const applyCertificate = async () => {
    const currentTime = youtubePlayer.currentTime;
    const duration = youtubePlayer.duration
    let percentage = (currentTime/duration)*100 
    console.log(percentage)
    const postData = {
      url: videoURL,
      title: document.getElementsByClassName("ytp-title-note-box")[0].value,
      completed: percentage
    };

    chrome.runtime.sendMessage({ type: "post_certificate", data: postData });

  }

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const postData = {
      url: videoURL,
      timestamped: "Bookmark at " + getTime(currentTime),
      currentTime: currentTime,
      Topic: "",
      title: document.getElementsByClassName("ytp-title-note-box")[0].value,
      content: document.getElementsByClassName("ytp-note-box")[0].value,
      copied: "",
      //   snaped: "",
    };

    // currentVideoBookmarks = await fetchBookmarks();

    chrome.runtime.sendMessage({ type: "post_data", data: postData });
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    // currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      const noteBox = document.createElement("INPUT");
      noteBox.setAttribute("type", "text");
      noteBox.setAttribute("value", "Enter Note");
      noteBox.className = "ytp-note-box";

      const TitleBox = document.createElement("INPUT");
      TitleBox.setAttribute("type", "text");
      TitleBox.setAttribute("value", "Enter Title");
      TitleBox.className = "ytp-title-note-box";

      const certificateBtn = document.createElement("INPUT");
      certificateBtn.setAttribute("type", "button");
      certificateBtn.setAttribute("value", "Apply Certificate");
      certificateBtn.className = "ytp-certificate-note-box";
      certificateBtn.style.backgroundColor = 'dodgerblue';
      certificateBtn.style.color = 'white';

      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      youtubeLeftControls.appendChild(certificateBtn);
      youtubeLeftControls.appendChild(TitleBox);
      youtubeLeftControls.appendChild(noteBox);
      youtubeLeftControls.appendChild(bookmarkBtn);


      certificateBtn.addEventListener("click", applyCertificate)

      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId, URL } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      videoURL = URL;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    }
    // else if (type === "DELETE") {
    //   currentVideoBookmarks = currentVideoBookmarks.filter(
    //     (b) => b.time != value
    //   );
    //   chrome.storage.sync.set({
    //     [currentVideo]: JSON.stringify(currentVideoBookmarks),
    //   });

    //   response(currentVideoBookmarks);
    // }
  });

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};

// window.addEventListener('keydown', stopPropagation, true);

// function stopPropagation(e) {
//   e.stopPropagation();
// }

var screenshotKey = false;
var playbackSpeedButtons = false;
var screenshotFunctionality = 0;
var screenshotFormat = "png";
var extension = "png";

function CaptureScreenshot() {
  var appendixTitle = "Capture_file." + extension;

  var title;

  var headerEls = document.querySelectorAll(
    "h1.title.ytd-video-primary-info-renderer"
  );

  function SetTitle() {
    if (headerEls.length > 0) {
      title = headerEls[0].innerText.trim();
      return true;
    } else {
      return false;
    }
  }

  if (SetTitle() == false) {
    headerEls = document.querySelectorAll("h1.watch-title-container");

    if (SetTitle() == false) title = "";
  }

  var player = document.getElementsByClassName("video-stream")[0];

  var time = player.currentTime;

  title += " ";

  let minutes = Math.floor(time / 60);

  time = Math.floor(time - minutes * 60);

  if (minutes > 60) {
    let hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
    title += hours + "-";
  }

  title += minutes + "-" + time;

  title += " " + appendixTitle;

  var canvas = document.createElement("canvas");
  canvas.width = player.videoWidth;
  canvas.height = player.videoHeight;
  canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);

  var downloadLink = document.createElement("a");
  downloadLink.download = title;

  function DownloadBlob(blob) {
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
  }

  async function ClipboardBlob(blob) {
    const clipboardItemInput = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([clipboardItemInput]);
  }

  // If clipboard copy is needed generate png (clipboard only supports png)
  if (screenshotFunctionality == 1 || screenshotFunctionality == 2) {
    canvas.toBlob(async function (blob) {
      await ClipboardBlob(blob);
      // Also download it if it's needed and it's in the correct format
      if (screenshotFunctionality == 2 && screenshotFormat === "png") {
        DownloadBlob(blob);
      }
    }, "image/png");
  }

  // Create and download image in the selected format if needed
  if (
    screenshotFunctionality == 0 ||
    (screenshotFunctionality == 2 && screenshotFormat !== "png")
  ) {
    canvas.toBlob(async function (blob) {
      DownloadBlob(blob);
    }, "image/" + screenshotFormat);
  }
}

function AddScreenshotButton() {
  var ytpRightControls =
    document.getElementsByClassName("ytp-right-controls")[0];
  if (ytpRightControls) {
    ytpRightControls.prepend(screenshotButton);
  }
}

var screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton ytp-button";
screenshotButton.style.width = "auto";
screenshotButton.innerHTML = "Screenshot";
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;

chrome.storage.sync.get(
  [
    "screenshotKey",
    "playbackSpeedButtons",
    "screenshotFunctionality",
    "screenshotFileFormat",
  ],
  function (result) {
    screenshotKey = result.screenshotKey;
    playbackSpeedButtons = result.playbackSpeedButtons;
    if (result.screenshotFileFormat === undefined) {
      screenshotFormat = "png";
    } else {
      screenshotFormat = result.screenshotFileFormat;
    }

    if (result.screenshotFunctionality === undefined) {
      screenshotFunctionality = 0;
    } else {
      screenshotFunctionality = result.screenshotFunctionality;
    }

    if (screenshotFormat === "jpeg") {
      extension = "jpg";
    } else {
      extension = screenshotFormat;
    }
  }
);

AddScreenshotButton();
