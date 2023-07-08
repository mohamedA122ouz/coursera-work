let get = (url, method = "GET") => {
    return new Promise((res, rej) => {
        let req = new XMLHttpRequest();
        req.open(method, url);
        req.send();
        req.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    let json = JSON.parse(this.responseText);
                    res(json);
                } catch (error) {
                    return res(this.responseText);
                }
            }
            else if (this.status !== 200) {
                console.error(Error("XHR ENDED WITH CODE=>"), this.status, this.readyState);
                rej(this.status);
            }
        }
    });
}

let projectController = {
    cardCreator: function () {
        this.getAsFetch().then((res) => {
            console.log(res[0].imagePath);
            let dom = document.querySelector("#info");
            let value = "";
            res.forEach((el) => {
                value +=`
                <div class="infoCard">
                <div class="cardicon">
                <iframe src="${el.link}" title="${el.name}"></iframe>
                </div>
                <div class="describe">
                <p class="text">${localStorage.getItem("preferedLang") === "ar" ? el.descriptionAR : el.descriptionEN}</p>
                </div><br>
                <p class="button" onclick="mgGlobalLinks('${el.link}')">${localStorage.getItem("preferedLang") === "ar" ? "زياره" : "visit"}</p>
                </div>
                `;
                console.log(value);
            });
            dom.innerHTML = value;
        });
    },
    createAcard: async function () {
        let res = await this.getAsFetch();
        let preferedLang = localStorage.getItem("preferedLang");
        let dom = document.querySelector("#info");
        let value = "";
        res.forEach(el => {
            value +=
            `
            <div class="infoCard">
            <div class="cardicon">
            <iframe src="${el.link}" title="${el.name}" onclick="return false;"></iframe>
            </div>
            <div class="describe">
            <p class="text" style="direction:${preferedLang === "ar" ? "rtl" : "ltr"};" >${preferedLang === "ar" ? el.descriptionAR : el.descriptionEN}</p>
            </div><br>
            <p class="button" onclick="mgGlobalLinks('${el.link}')">${preferedLang === "ar" ? "زياره" : "visit"}</p>
            </div>
            `;
        });
        dom.innerHTML = value;
    }
    ,
    getAsAJAX: function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.origin + "/projects/files/file.json";
        }
        return get(URL || localurl);
    },
    getAsFetch: function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.href.replace("/projects/projects.html","/projects/files/file.json");
        }
        return fetch(URL || localurl, get).then((res) => {
            return res.json();
        });
    },
    getAsAsync: async function (URL) {
        let localurl;
        if (!URL) {
            localurl = window.location.origin + "/projects/files/file.json";
        }
        return await fetch(URL || localurl);
    }
}