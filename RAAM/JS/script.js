let screen = innerHeight;
let totalheight = document.body.scrollHeight;
let load = document.getElementById("load");
document.addEventListener("touchstart", () => { animation.load(); });
document.addEventListener("touchend", () => { animation.load(); });
document.addEventListener("touchend", () => { animation.load(); });
let animation = {
    load: function () {
        let shown = scrollY;
        let booster = 125;
        // console.log(shown);
        load.style.cssText = `background-image:linear-gradient(45deg, rgb(255, 122, 155) ${(shown) / (totalheight - screen - booster) * 100}%, rgb(8, 135, 194)${(shown + 1) / (totalheight - screen - booster) * 100}%);`
    },
    welcomeSection: document.querySelector(".welcome"),
    controlWelcome: function () {
        let shown = scrollY;
        // console.log((screen - shown) / screen)
        let i = (screen - shown) / screen < 0.6 ? 0.6 : (screen - shown) / screen;
        this.welcomeSection.style.cssText = `transform: scale(${i - 0.01});`;
    },
    prev: document.getElementById("w"),
    nameAndMajor: document.querySelectorAll("#info>div>p"),
    startAnimation: function () {
        let shown = scrollY;
        let prev = this.prev.offsetHeight;
        console.log(prev);
        if (prev < (shown + screen - (prev / 1.7)))
            this.nameAndMajor.forEach(el => {
                el.classList.add("animation");
            });
    },
    menu: document.querySelector("ul"),
    li: document.querySelectorAll("ul>li"),
    iscollapsed: true,
    collapse: function () {
        if (!this.iscollapsed) {
            this.menu.classList.add("collapse");
            this.iscollapsed = !this.iscollapsed;
        } else {
            this.menu.classList.remove("collapse");
            this.iscollapsed = !this.iscollapsed;
        }
    }
}
function selectLang(lang) {
    localStorage.setItem("preferedLang", lang);
    window.location.reload();
}
let projectController = {
    GetAsAJAX: function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.href + "/projects/files/file.json";
            localurl = localurl.replace("index.html/", "");
        }
        let req = new XMLHttpRequest();
        req.open("GET", (URL || localurl));
        req.send();
        req.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    let json = JSON.parse(this.responseText);
                    return json;
                } catch (error) {
                    return this.responseText;
                }
            }
            else if (this.status !== 200) {
                console.error(this.status, this.readyState)
            }
        }
    }
}
function mgLocalLinks(id) {
    let aa = document.createElement("a");
    aa.setAttribute("href", `#${id}`);
    document.body.appendChild(aa);
    aa.click();
    document.body.removeChild(aa);
    animation.collapse();
}
function mgGlobalLinks(url = "", target = "") {
    let aa = document.createElement("a");
    if (url) {
        aa.setAttribute("href", url);
    } else {
        aa.setAttribute("href", `https://drive.google.com/file/d/1aopLsnwb3WigiaXlqzp3dXK-MW5q7ZAh/view?usp=sharing`);
    }
    if (target) {
        aa.setAttribute("target", target);
    } else {
        aa.setAttribute("target", '_blank');
    }
    document.body.appendChild(aa);
    aa.click();
    document.body.removeChild(aa);
    animation.collapse();
}

