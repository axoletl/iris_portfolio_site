// nav click events
function navEntry(id, event) {
    //stop event running twice on overlapping elements
    event.stopPropagation();
    let target = event.target;
    //animation
    target.classList.add("scale-up-center");
    contentTrans(id);
    target.addEventListener('animationend', (event) => {
        if (event.animationName == 'scale-up-center') {
            target.classList.remove('scale-up-center');
        }
    });

    //reset to top of new page
    window.scrollTo(0,0);
}

// toggle between mobile menu and mobile content
function mobileMenu() {
    console.log('toggle menu');
    if (controlMask.style.opacity != '0.9') {
        controlMask.style.opacity = 0.9;
        controlMask.style.pointerEvents = "all";
    } else {
        controlMask.style.opacity = 0;
        controlMask.style.pointerEvents = "none";
    }
    if (controlDiv.style.opacity != '1') {
        controlDiv.style.opacity = 1;
        controlDiv.style.pointerEvents = "all";
    } else {
        controlDiv.style.opacity = 0;
        controlDiv.style.pointerEvents = "none";
    }
}

//page location info
let pageLoc;

hashInfo();
window.onhashchange = function () {
    hashInfo();
    readUrl();
}

// update pageLoc to hash
function hashInfo() {
    pageLoc = window.location.hash.replace("#", "");
    if (window.location.hash.replace("#", "") == 'index') {
        pageLoc = "home";
    }
    if (window.location.hash == '') {
        pageLoc = "home";
    }

    navInfo.children[0].textContent = "world: " + pageLoc;
}

// read mouse coordinates
let mX = 0;
let mY = 0;
let wY = 0;
let x = 0;
let y = 0;

window.onscroll = function () {
    wY = window.scrollY;
    coordInfo();
}

window.onmousemove = function (event) {
    mX = event.clientX;
    mY = event.clientY;
    coordInfo();
}

// display mouse  coordinates
function coordInfo() {
    x = parseInt(mX);
    y = parseInt(mY) + parseInt(wY);
    navInfo.children[1].textContent = "x: " + x;
    navInfo.children[2].textContent = "y: " + y;
}