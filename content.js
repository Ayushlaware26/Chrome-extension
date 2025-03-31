const bookmarImgUrl=chrome.runtime.getURL("assests/bookmark.png");

window.addEventListener("load",addBookmarkButton);

function addBookmarkButton(){
    const bookmarkButton=document.createElement('img');
    bookmarkButton.id="add-bookmark-button";
    bookmarkButton.src=bookmarImgUrl;
    bookmarkButton.style.height="30px";
    bookmarkButton.style.width="30px";

    const askDoubtButton=document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0];

    askDoubtButton.insertAdjacentElement("beforebegin",bookmarkButton);
}