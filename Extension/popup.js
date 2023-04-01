let activeTab = "";

// --------------Login Feature-------------

let isLoggedIn = true;

if (isLoggedIn) {
  document.getElementById("loggedOut").classList.add("hidden");
  document.getElementById("loggedIn").classList.remove("hidden");
} else {
  document.getElementById("loggedIn").classList.add("hidden");
  document.getElementById("loggedOut").classList.remove("hidden");
}

// ***********************************
// ----------Print Feature----------

document.getElementById("printButton").addEventListener("click", printDiv);

function printDiv(divName = "printable") {
  var content = document.getElementById("printable").innerHTML;
  var printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Print</title></head><body>");
  printWindow.document.write(content);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// ***********************************

const addNewBookmark = (bookmarks, bookmark) => {
  // const bookmarks = document.querySelector('.bookmarks')
  const newBookmarkElement = document.createElement("div");
  const bookmarkTitleElement = document.createElement("div");
  const bookmarkNoteTitleElement = document.createElement("div");
  const bookmarkSubTitleElement = document.createElement("div");
  const controlsElement = document.createElement("div");
  const actionParentElement = document.createElement("div");

  bookmarkNoteTitleElement.textContent = bookmark.title;
  controlsElement.className = "bookmark-title-note";

  bookmarkTitleElement.textContent = bookmark.timestamped;
  controlsElement.className = "bookmark-controls";


  bookmarkSubTitleElement.className = "bookmark-subTitle"
  bookmarkSubTitleElement.textContent = bookmark.content
  
  setBookmarkAttributes("play", onPlay, controlsElement);
  //     setBookmarkAttributes("delete", onDelete, controlsElement);

  actionParentElement.className = "bookmark";
  newBookmarkElement.id = "bookmark-" + bookmark.currentTime;
  newBookmarkElement.className = "bookmark-taken";
  actionParentElement.setAttribute("timestamp", bookmark.currentTime);
      actionParentElement.appendChild(bookmarkNoteTitleElement);
      actionParentElement.appendChild(bookmarkTitleElement);
      actionParentElement.appendChild(controlsElement);
      newBookmarkElement.appendChild(actionParentElement);
      newBookmarkElement.appendChild(bookmarkSubTitleElement);
  bookmarks.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarksElement, bookmark);
    }
  } else {
    bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
  }

  return;
};

const onPlay = async (e) => {
//   const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");

//   chrome.tabs.sendMessage(activeTab.id, {
//     type: "PLAY",
//     value: bookmarkTime,
//   });
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};



document.addEventListener("DOMContentLoaded", async () => {

  chrome.runtime.sendMessage({ action: "getTabUrl" }, function (response) {
    activeTab  = response.url;
    if(response.url){
        fetch("http://192.168.247.28:8002/api/notes/")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .then((data) => {
          const currentVideoBookmarks = data.notes.length !== 0 ? data.notes : [];
          const filteredItems = currentVideoBookmarks.filter(item => item.url === response.url);
          viewBookmarks(filteredItems);
          console.log(filteredItems)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }else{
        const container = document.getElementsByClassName("container")[1];

        container.innerHTML =
          '<div class="title">This is not a youtube video page.</div>';
    }
  });
});
