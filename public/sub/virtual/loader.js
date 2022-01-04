// lets us read html from string to grab contents of tagged ids
let parser = new DOMParser();

// changes hash
function contentTrans(id) {

    //parse id
    let hashid = id.replace('sub_', '');

    //update url from id
    document.location.hash = hashid;

    // url will automatically be reread from hash change event listener
}

readUrl();


// actually loads new html content and parents it to contentDiv
function readUrl() {
    //redirects pages with no hash to index.html
    let hash = location.hash.replace('#', '');
    if (hash == '') {
        hash = 'index';
    }
    let url = hash + ".html";

    //remove content
    while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
    }

    // fetch function

    // console.log('fetching: ' + url);
    fetch(url)
        .then(response => {
            return response.text()
        }).then(response => {
            let doc = parser.parseFromString(response, 'text/html');
            let content = doc.getElementById("contentDiv");
            let header = doc.getElementById("headerDiv");
            let nav = doc.getElementById("navDiv");

            //populate body and play animation
            wrapper.replaceChild(content, contentDiv);
            contentDiv.classList.add('content-fade-in');

            //populate header
            headerDiv.style.display = header.style.display;
            headerDiv.children[0].textContent = header.children[0].textContent;
            headerDiv.children[1].textContent = header.children[1].textContent;

            //copy nav
            navDiv.style.opacity = nav.style.opacity;
            navDiv.style.pointerEvents = nav.style.pointerEvents;

            //catch any avatar elements in content being loaded
            updateAvatar();
        })
}