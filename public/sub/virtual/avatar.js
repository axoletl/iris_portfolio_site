// gets values in avatar array and assigns each static (non message) avatar element a background image

function updateAvatar() {
    //get every avatar element
    let avElements = document.getElementsByClassName("av-static");

    //iterate through and update children according to array
    for (let i = 0; i < avElements.length; i++){
        avElements[i].children[0].style.backgroundImage = "url(assets/avatar/av" + avatar[0] + ".png)";
        avElements[i].children[1].style.backgroundImage = "url(assets/avatar/av" + avatar[1] + ".png)";
        avElements[i].children[2].style.backgroundImage = "url(assets/avatar/av" + avatar[2] + ".png)";
    }
}


// called from onclick of each button of avatar editor, loops between 0-avMax in avatar array

function editAvatar(part, increment){
    let newVal = avatar[part] += increment;
    if (newVal < 1){
        newVal = avMax;
    }
    if (newVal > avMax){
        newVal = 1;
    }
    avatar[part] = newVal;
    updateAvatar();
}