const AZ_PROBLEM_KEY="AZ_PROBLEM_KEY";

const bookmarkSection=document.getElementById("bookmarks");

const assetsURLMap={
    "play":chrome.runtime.getURL("assests/play.png"),
    "delete":chrome.runtime.getURL("assests/delete.png"),
}

document.addEventListener("DOMContentLoaded",()=>{
    chrome.storage.sync.get([AZ_PROBLEM_KEY],(data)=>{
        const currentBookmarks=data[AZ_PROBLEM_KEY]||[];
        viewBookMarks(currentBookmarks);
    });
});

function viewBookMarks(bookmarks){
    bookmarkSection.innerHTML="";

    if(bookmarks.length==0){
        bookmarkSection.innerHTML="<i>NO Bookmarks to Show<i>";
        return;
    }

    bookmarks.forEach(bookmark=>addNewBookmark(bookmark));
}

function addNewBookmark(bookmark){
    const newBookmark=document.createElement('div');
    const bookmarkTitle=document.createElement('div');
    const bookmarkControls=document.createElement('div');
    
    bookmarkTitle.textContent=bookmark.name;
    bookmarkTitle.classList.add("bookmark-title");
    bookmarkControls.classList.add("bookmark-controls");

    newBookmark.classList.add("bookmark");
    newBookmark.append(bookmarkTitle);
    newBookmark.append(bookmarkControls);

    setControlAttributes(assetsURLMap["play"],() => onPlay(bookmark),bookmarkControls);
    setControlAttributes(assetsURLMap["delete"],() => onDelete(bookmark),bookmarkControls);

    bookmarkSection.appendChild(newBookmark);
}

function setControlAttributes(src,handler,parentDiv){
    const controlElement=document.createElement("img");
    controlElement.src=src;
    controlElement.addEventListener("click",handler);
    parentDiv.appendChild(controlElement);
}

function onPlay(bookmark){
    chrome.tabs.create({url: bookmark.url});
}

function onDelete(bookmark){
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        const updatedBookmarks = currentBookmarks.filter(b => b.url !== bookmark.url);
        
        chrome.storage.sync.set({[AZ_PROBLEM_KEY]: updatedBookmarks}, () => {
            viewBookMarks(updatedBookmarks);
        });
    });
}