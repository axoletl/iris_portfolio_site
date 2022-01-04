//import websocket
let ws;
let user = 'user' + rndNum(0, 498289);

let avMax = 6;

let avatar = [rndNum(1, avMax + 1), rndNum(1, avMax + 1), rndNum(1, avMax + 1)];
let initConnect = false;

function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//login
loginSubmit.onclick = function () {
    if (loginInput.value == '') {
        return;
    }
    user = loginInput.value;
    initWs();
    generateSysmsg("SYSTEM: connecting...");
    msgUserDiv.textContent = user;

    loginDiv.style.opacity = 0;
    loginDiv.style.pointerEvents = "none";
}
loginInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        loginSubmit.click();
    }
});

//initalise websocket when called
function initWs() {
    //catch existing connection
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }

    //initialise websocket
    ws = new WebSocket('wss://webmedia-mmo-ws.herokuapp.com/');

    //ws success event
    ws.onopen = () => {
        // console.log('connection open');
        if (initConnect == false) {
            generateSysmsg("SYSTEM: connected as " + user + ", welcome to VIRTUAL WORLDS");
            initConnect = true;
        }
    }

    //ws close event
    ws.onclose = function () {
        ws = null;
        // console.log('connection closed or unsuccessful, retrying');
        generateSysmsg("SYSTEM: connection closed or unsuccessful, retrying...");
        //retry every 10 sec
        retryWs();
    }

    //ws receiving event
    ws.onmessage = ({ data }) => parseMsg(data);
}

//reconnect
function retryWs() {
    let retryInterval = setInterval(function () {
        if (ws) {
            // console.log('connection restored');
            generateSysmsg("SYSTEM: connection restored!");
            clearInterval(retryInterval);
        }
        initWs();
    }, 5000);
}

//message send
msgSubmit.onclick = function () {
    //error handle
    if (!ws) {
        // generateSysmsg("SYSTEM: connection closed, retrying connection");
        return;
    }

    if (msgInput.value == '') {
        return;
    }

    let data = {
        "user": user,
        "location": pageLoc,
        "avatar": avatar,
        "message": msgInput.value,
        "x": x,
        "y": y
    }

    ws.send(JSON.stringify(data));
    parseMsg(JSON.stringify(data));
    msgInput.value = '';
}

//detect enter key
msgInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        msgSubmit.click();
    }
});

//message parse
function parseMsg(message) {
    // console.log(message);
    let textData;
    if (message instanceof Blob) {
        message.text().then((resp) => {
            textData = resp;
            let data = JSON.parse(textData);
            console.log(data);
            //display
            let userString = data.user + "@" + data.location + "(" + data.x + "," + data.y + ")";
            generateEntry(userString, false, data.avatar, data.message);
        });
    } else {
        textData = message;
        let data = JSON.parse(textData);
        console.log(data);
        //display
        let userString = data.user + "@" + data.location + "(" + data.x + "," + data.y + ")";
        generateEntry(userString, true, data.avatar, data.message);
    }
}

// display user message
function generateEntry(userList, self, avatarList, message) {
    let msg = document.createElement('DIV');
    let user = document.createElement('DIV');
    let avatar = document.createElement('DIV');
    let av1 = document.createElement('DIV');
    let av2 = document.createElement('DIV');
    let av3 = document.createElement('DIV');
    let userText = document.createTextNode(userList + ': ' + message);

    if (self == true) {
        msg.classList.add("msg-selfmsg");
    } else {
        msg.classList.add("msg-msg");
    }

    user.classList.add("msg-user");
    avatar.classList.add("msg-avatar");

    //avatar content
    // avatar.textContent = avatarList;
    av1.classList.add("msg-avatar-organ");
    av1.style.backgroundImage = "url(assets/avatar/av" + avatarList[0] + ".png)";
    av2.classList.add("msg-avatar-organ");
    av2.style.backgroundImage = "url(assets/avatar/av" + avatarList[1] + ".png)";
    av3.classList.add("msg-avatar-organ");
    av3.style.backgroundImage = "url(assets/avatar/av" + avatarList[2] + ".png)";

    //construct av
    avatar.appendChild(av1);
    avatar.appendChild(av2);
    avatar.appendChild(av3);

    //construct
    user.appendChild(avatar);
    user.appendChild(userText);
    msg.appendChild(user);

    msgCont.prepend(msg);
}

// display system message
function generateSysmsg(message) {
    let msg = document.createElement('DIV');
    let user = document.createElement('DIV');
    let userText = document.createTextNode(message);

    msg.classList.add("msg-msg");
    user.classList.add("msg-user");

    user.appendChild(userText);
    msg.appendChild(user);

    msgCont.prepend(msg);
}