let h1 = document.querySelector("h1");

document.body.style.backgroundSize = `${window.screen.width < window.screen.height ? window.screen.width : window.screen.height}px`;
document.querySelector("#container").setAttribute("style", `width:${window.screen.width}px`);
document.querySelector("header").setAttribute("style", `max-width:${window.screen.width}px`);
let list = null;
let start = true;
let direction = 'ltr';

let panel = {
    //show edit list panel
    hidden: false,
    container: {},
    saveType: "update",//value is either update or add
    container2: (query) => { return document.querySelector(`${query}`) },
    structure: `<div contenteditable = "true" tabindex="-1" id="textc"oninput="panel.dirct(this.innerHTML[0])"></div><br>
    <button id="clear" onclick="panel.clear()">clear</button>
    <button id="save" onclick="panel.save()">save</button>
    <button id="hide" onclick="panel.hide()">Hide</button>
`,
    //determine the direction for list direction and the edit panel
    dirct: (test, root) => {
        if (test) {
            let a = "أ".charCodeAt(0);
            let z = "ي".charCodeAt(0);
            if (test.charCodeAt(0) >= a && test.charCodeAt(0) <= z)
                direction = "rtl";
            else
                direction = "ltr";
        }
        root === 0 ? 0 : panel.self.style.direction = direction;
    },
    getself: () => { return document.querySelector("#textc"); },
    self: {},
    show: () => {
        panel.container = panel.container2("#textReady");
        panel.self = panel.getself();
        panel.container.style.display = "block";
        panel.hidden = false;
        panel.self.focus();
    }
    ,
    build: () => {
        if (!panel.hidden) {
            panel.container = panel.container2("#textReady");
            start = false;
            panel.container.innerHTML = panel.structure;
            panel.self = panel.getself();
            panel.self.focus();
        }
        else
            panel.show();
    },
    //hide edit list panel
    hide: () => {
        panel.hidden = true;
        panel.container.style.display = "none";
    },
    del: () => {
        panel.container.innerHTML = "";
    },
    //save and clear buttons functionalities
    saveOnAdd: () => {
        control.isitadd = false;
        panel.del();
        control.processForAdd(panel.self.innerHTML);
        return panel.self.innerHTML;
    },
    clear: () => {
        panel.self.innerHTML = null;
    },
    save: () => {
        if (!control.isitadd) {
            list = panel.self.innerHTML;
            panel.del();
            control.additem('new items');
            start = true;
            return panel.self.innerHTML;
        }
        else {
            panel.saveOnAdd();
        }

    }
};
// let description = {
//     set: () => {
//         control.selectAll("li").forEach((ele,i)=>{
//             ele.onclick = ()=>{
//                 (-1);
//             }
//         });
//     },
// }
let storage = {
    GSave:(itemname,value)=>{
        localStorage.setItem(itemname,value);
        return `the ${itemname} is stored successfully`;
    },
    GGet:(itemname)=>{
        if(localStorage.getItem(itemname)){
            let value = localStorage.getItem(itemname).split(',');
            return value.map(ele=>ele);
        }
    }
    ,
    save: (arr) => {
        if (!list) { return 0; }
        localStorage.setItem("list", arr.filter(ele => ele));
        storage.savecheck(-1);
        return "saved";
    },
    saveForAdd: (arr) => {
        let data = localStorage.getItem("list").split(',').concat(arr);
        let data2 = localStorage.getItem("checkState").split(',').concat([0]);
        localStorage.setItem("list", data);
        localStorage.setItem("checkState", data2);
        control.additem("restore");
        return "addition saved";
    },
    del: (index) => {
        let data = localStorage.getItem("list").split(',');
        data[index] = null;
        let data2 = localStorage.getItem("checkState").split(',');
        data2[index] = null;
        data = data.filter(ele => ele);
        data2 = data2.filter(ele => ele);
        localStorage.setItem("list", data);
        localStorage.setItem("checkState", data2);
        control.additem("restore");
        return "item deleted";

    }
    ,
    //save whether checkbox checked or not in localstorage
    savecheck: (root) => {
        if (root === -1) {
            let listPro = list.split('\\n') || list;
            let checkState = [];
            for (let i = 0; i < listPro.length; i++) {
                if (!listPro[i]) { continue; }
                let check = control.select(`#c${i}`);
                checkState.push(check.checked);
            }
            localStorage.setItem("checkState", checkState);
        }
        else {
            let changer = localStorage.getItem("checkState").slice(0, localStorage.getItem("checkState").length).split(',');
            let check = control.select(`#c${root}`);
            changer[root] = check.checked;
            localStorage.setItem("checkState", changer);
        }
    },
    //restore checked item
    restoreChecks: () => {
        let items = localStorage.getItem("checkState").split(',');
        for (let i = 0; i < items.length; i++) {
            let span = control.select(`#s${i}`);
            let check = control.select(`#c${i}`);
            if (items[i] === "true") {
                check.checked = true;
                span.setAttribute("class", `checked`);
            }
        }
    }
};
let control = {
    listPro: "",
    isitadd: false,
    addbutton: () => {
        control.isitadd = true;
        panel.build();
    },
    savebutton: () => {
        control.isitadd = false;
        panel.build();
    }
    ,
    select: (item) => document.querySelector(`${item}`)//select item form document
    ,
    selectAll: (items) => document.querySelector(`${items}`),
    //process input
    processData: (root) => {
        if (root === "new items")
            listPro = list.split('\\n') || list;
        else
            listPro = localStorage.getItem("list").split(',');
        return listPro;
    },
    processForAdd: (value) => {
        value = value.split('\\n') || value;
        storage.saveForAdd(value);
    }
    ,

    unblurElseWhere: () => {
        let header = document.querySelector("header");
        let container = document.querySelector("#container");
        header.style.filter = "brightness(100%)";
        header.style.filter = "blur(0px)";
        container.style.filter = "brightness(100%)";
        container.style.filter = "blur(0px)";
    }
    ,
    //adding all items from edit list panel if root = -1 else it gets the element from localstorage
    additem: (root) => {
        // root 0 means restore
        //root -1 means new items
        control.listPro = control.processData(root);
        console.log(listPro);
        let ol = control.select("#listIt");
        let item = "";
        let letgo = true;
        for (let i = 0; i < listPro.length; i++) {
            if (control.listPro[i]) {
                item +=
                    `<li class="vertical">${i + 1}.
                    <div style= "display:inline;" class = "olLi" id="s${i}">
                    ${listPro[i] || "item not specified"}
                    </div>
                    <button class="delete" onclick="control.showAlert(${i})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                    <input type="checkbox" id="c${i}" onclick="control.checkItem(${i})">
                    </li>`;
                letgo = false;
            }
            else if (control.listPro.length - 1 === i && letgo) {
                //this just for try 
                item = `<span>${"No items Written! "}</span>`;
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                ol.innerHTML = "";
                                panel.build(start);
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

        //version 0.2 of writing
        // document.querySelectorAll(`.olLi`).forEach((ele, i) => {
        //     console.log("work");
        //     ele.textContent = `${listPro[i]}` || "item not specified";
        // })
        //description.set();
        root === "restore" ? panel.dirct(listPro[0][0], 0) : 0;
        ol.style.direction = direction;
        root === "restore" ? storage.restoreChecks() : 0;
        root === "new items" ? storage.save(listPro) : 0;
    },
    //check if the checkbox for an item is checked if checked it gives the item class checked and by css it shows the throw line 
    //else which means that the chcekbox became unchecked the else will remove the class and the item get back to it's default font style
    checkItem: (i) => {
        let span = document.querySelector(`#s${i}`);
        let check = document.getElementById(`c${i}`);
        if (check.checked)
            span.setAttribute("class", `checked`);
        else
            span.removeAttribute("class", `checked`);
        storage.savecheck(i);
    },
    hideAlert: () => {
        control.unblurElseWhere();
        document.querySelector("#alert").style.display = "none";
        control.deleteItemIndex = null;
    },
    deleteItemIndex: null
    ,
    showAlert(i) {
        document.querySelector("#alert").style.display = "block";
        control.blurElseWhere();
        control.deleteItemIndex = i;
    }
    , delItem: () => {
        storage.del(control.deleteItemIndex);
        control.unblurElseWhere();
        control.hideAlert();
    }
    ,
    blurElseWhere: () => {
        let header = document.querySelector("header");
        let container = document.querySelector("#container");
        header.style.filter = "brightness(0.5)";
        header.style.filter = "blur(4px)";
        container.style.filter = "brightness(25%)";
        container.style.filter = "blur(4px)";
    }

    // wallpaper: () => {
    //     let request = new XMLHttpRequest;
    //     request.open("GET","file:///E:/myDesktop/programming/JS/todoList/icon/todo.png",true);
    //     request.send(null);
    //     request.onload = ()=>{

    //         let file = new FileReader();
    //         file.readAsDataURL(document.forms[0].pic);
    //         file.onload = ()=>{
    //             let url = file.result;
    //             document.body.style.backgroundImage = `url(${url|| '/icon/todo.png'})`;
    //             document.body.style.backgroundRepeat = "no-repeat";
    //             document.body.style.backgroundPosition = "center -10%";
    //         }
    //     };
    // }
};

let settings = {
    focus: () => {
        settings.settingsOpened = false;
    }
    , settingsOpened: true,
    show: () => {
        settings.settingsOpened = true;
        let setting = document.querySelector("#settings");
        setting.style.display = "flex";
        setting.style.flexDirection = "column";
        setTimeout(() => {
            setting.setAttribute("class", "show-settings");
        }, 1);
        control.blurElseWhere();
        setTimeout(() => {
            setting.focus();
        }, 350)
    }
    ,
    hide: () => {
        console.log("hide in process!");
        if (settings.settingsOpened) {
            let setting = document.querySelector("#settings");
            setting.removeAttribute("class");
            setTimeout(() => {
                setting.style.display = "none";
                settings.settingsOpened = false;
            }, 350);
            control.unblurElseWhere();
        }
    },
    getFont:()=>{
        let font = document.querySelector("#font");
        return font.value ==="browser default"?false:font.value;
    },
    fontSize:()=>{
        let size = document.querySelector("#fontsize").value;
        return  `${size}pt`;
    }
    ,apply:()=>{
        let font = settings.getFont();
        let size = settings.fontSize()
        let html = document.querySelector("html").style;
        if(font){
            html.fontFamily = font;
        }
        html.fontSize = size;
        settings.hide();
        storage.GSave("font",font);
        storage.GSave("fontSize",size);
    }
    ,restoreAndApply:()=>{
        let sizeEl = document.querySelector("#fontsize").value;
        let fontEl = document.querySelector("#font");
        let html = document.querySelector("html").style;
        let font = storage.GGet("font")[0];
        if(font){
            html.fontFamily = font;
        }
        let size = storage.GGet("fontSize")[0];
        html.fontSize = size;
        sizeEl.value = size;
        fontEl.value = font;
    }
};


//you can restore you old work
(function notifyme() {
    if (Notification.permission == "granted" && localStorage.getItem("notification") != "false") {
        setTimeout(() => {
            localStorage.setItem("notification", "false");
            let noti = new Notification("TO-List",
                {
                    body: "site uses cookies to restore old session!",
                    icon: "icon/todo.png"
                }
            )
        }, 1000)
    }
    else if (Notification.permission == "denied") {
        return 0;
    }
    else {
        Notification.requestPermission().then(() => {
            console.log(Notification.permission);
        })
    }
})();