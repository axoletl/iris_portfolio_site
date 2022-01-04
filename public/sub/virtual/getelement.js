// window.onload event

window.onload = function () {
    let wrapper = document.getElementById("wrapper");
    let headerDiv = document.getElementById("headerDiv");
    let controlToggle = document.getElementById("controlToggle");
    let controlMask = document.getElementById("controlMask");
    let controlDiv = document.getElementById("controlDiv");
    let navDiv = document.getElementById("navDiv");
    let navInfo = document.getElementById("navInfo");
    let loginDiv = document.getElementById("loginDiv");
    let msgUserDiv = document.getElementById("msgUserDiv");
    let msgDiv = document.getElementById("msgDiv");
    let msgCont = document.getElementById("msgCont");
    let loginInput = document.getElementById("loginInput");
    let loginSubmit = document.getElementById("loginSubmit");
    let msgInput = document.getElementById("msgInput");
    let msgSubmit = document.getElementById("msgSubmit");
    let contentDiv = document.getElementById("contentDiv");

    //update avatars on load
    updateAvatar();
}