let h1 = document.querySelector("h1");
let list = null;
let start = true;
let direction = 'ltr';

//show edit list panel
function addMessage(root) {
    if (root === -1 || start) {
        start = false;
        let div = document.querySelector("#textReady");
        div.innerHTML = `<textarea id="textc"oninput="dirct(this.value[0])"></textarea><br>
        <button id="clear" onclick="saveandclear('clear')">clear</button>
        <button id="save" onclick="saveandclear('save')">save</button>
    `;
    }
    document.querySelector("#textc").focus();
};
//determine the direction for list direction and the edit panel
function dirct(test, root) {
    let textarea = document.querySelector("#textc");
    if (test) {
        let a = "أ".charCodeAt(0);
        let z = "ي".charCodeAt(0);
        if (test.charCodeAt(0) >= a && test.charCodeAt(0) <= z) {
            direction = "rtl";
        }
        else
            direction = "ltr";
    }
    root === 0 ? 0 : textarea.style.direction = direction;
}

//hide edit list panel
function hideMessage() {
    let div = document.querySelector("#textReady");
    div.innerHTML = ``;
};
//save and clear buttons functionalities
function saveandclear(isitclear) {
    let textarea = document.querySelector("#textc");
    if (isitclear == "clear") {
        textarea.value = null;
    }
    else {
        list = textarea.value;
        hideMessage();
        additem(-1);
    }
    start = true;
}
//check if the checkbox for an item is checked if checked it gives the item class checked and by css it shows the throw line 
//else which means that the chcekbox became unchecked the else will remove the class and the item get back to it's default font style
function checkItem(i) {
    let span = document.querySelector(`#s${i}`);
    let check = document.getElementById(`c${i}`);
    if (check.checked)
        span.setAttribute("class", `checked`);
    else
        span.removeAttribute("class", `checked`);
    savecheck(i);
}
//adding all items from edit list panel if root = -1 else it gets the element from localstorage
function additem(root) {
    let listPro = "";
    if (root === -1)
        listPro = list.split('\n') || list;
    else
        listPro = localStorage.getItem("list").split(',');
    console.log(listPro);
    let ol = document.querySelector("#listIt");
    let item = "";
    let letgo = true;
    for (let i = 0; i < listPro.length; i++) {
        if (listPro[i]) {
            item +=
                `<li>
                <span id="s${i}">${listPro[i] || "item not specified"}</span>
                <input type="checkbox" id="c${i}" onclick="checkItem(${i})">
                </li>`;
            letgo = false;
        }
        else if (listPro.length - 1 === i && letgo) {
            //this just for try 
            item = `<span>${"No items Written! "}</span>`;
            setTimeout(() => {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            ol.innerHTML = "";
                            addMessage(start);
                        }, 1000);
                        ol.innerHTML = "";
                        if (start) {
                            item = `<span>${"No items Written! 1"}</span>`;
                            ol.innerHTML = item;
                        }
                    }, 1000);
                    ol.innerHTML = "";
                    if (start) {
                        item = `<span>${"No items Written! 2"}</span>`;
                        ol.innerHTML = item;
                    }
                }, 1000);
                ol.innerHTML = "";
                if (start) {
                    item = `<span>${"No items Written! 3"}</span>`;
                    ol.innerHTML = item;
                }
            }, 1000);
        }
    }
    ol.innerHTML = item;
    root === 0 ? dirct(listPro[0][0], 0) : 0;
    ol.style.direction = direction;
    root === 0 ? restoreChecks() : 0;
    root === -1 ? saveinstorage() : 0;
};
function saveinstorage() {
    if (!list) { return 0; }
    let listPro = list.split('\n') || list;
    localStorage.setItem("list", listPro);
    savecheck(-1);
}
//save whether checkbox checked or not in localstorage
function savecheck(root) {
    if (root === -1) {
        let listPro = list.split('\n') || list;
        let checkState = [];
        for (let i = 0; i < listPro.length; i++) {
            if (!listPro[i]) { continue; }
            let check = document.getElementById(`c${i}`);
            checkState.push(check.checked);
        }
        localStorage.setItem("checkState", checkState);
    }
    else {
        let changer = localStorage.getItem("checkState").slice(0, localStorage.getItem("checkState").length).split(',');
        let check = document.getElementById(`c${root}`);
        changer[root] = check.checked;
        localStorage.setItem("checkState", changer);
    }
}
//restore checked item
function restoreChecks() {
    let items = localStorage.getItem("checkState").split(',');
    for (let i = 0; i < items.length; i++) {
        let span = document.querySelector(`#s${i}`);
        let check = document.getElementById(`c${i}`);
        if (items[i] === "true") {
            check.checked = true;
            span.setAttribute("class", `checked`);
        }
    }
}
//you can restore you old work
(function notifyme(){
    if(Notification.permission =="granted"&&localStorage.getItem("notification")!="false"){
        setTimeout(()=>{
            localStorage.setItem("notification","false");
            let noti = new Notification("TO-List",
            {
                body:"site uses cookies to restore old session!",
                icon:"icon/todo.jpg"
            }
            
            )
        },1000)
    }
    else if(Notification.permission == "denied"){
        return 0;
    }
    else{
        Notification.requestPermission().then(()=>{
            console.log(Notification.permission);
        })
    }
})();